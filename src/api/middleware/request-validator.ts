import { NextFunction, Request, Response } from 'express'
import { Location, ValidationChain, body, cookie, header, param, query, validationResult } from 'express-validator'

// Định nghĩa RuleType, có thể mở rộng thêm
export type RuleType = {
  field: string
  location: Location
  type: 'string' | 'int' | 'float' | 'date' | 'boolean' | 'object' | 'array' | 'email'
  required?: boolean // Mặc định là true
}

// Hàm factory chính, trả về một middleware duy nhất
const validationRules = (rules: RuleType[]) => {
  // Hàm này sẽ xây dựng một chuỗi validation hoàn chỉnh cho một rule
  const buildValidationChain = (rule: RuleType): ValidationChain => {
    // 1. Xác định vị trí của field (body, query, params, etc.)
    let chain: ValidationChain
    switch (rule.location) {
      case 'body':
        chain = body(rule.field)
        break
      case 'cookies':
        chain = cookie(rule.field)
        break
      case 'headers':
        chain = header(rule.field)
        break
      case 'params':
        chain = param(rule.field)
        break
      default: // Mặc định là 'query'
        chain = query(rule.field)
        break
    }

    // 2. ✅ Xử lý 'required' một lần duy nhất
    if (rule.required === false) {
      // Nếu không bắt buộc, dùng .optional()
      chain = chain.optional()
    } else {
      // Nếu bắt buộc (mặc định), kiểm tra tồn tại và không rỗng
      chain = chain
        .exists()
        .withMessage(`${rule.field} is required`)
        .notEmpty()
        .withMessage(`${rule.field} cannot be empty`)
    }

    // 3. ✅ Áp dụng validator và sanitizer dựa trên 'type'
    switch (rule.type) {
      case 'string':
        chain = chain
          .isString()
          .withMessage(`${rule.field} must be a string`)
          .trim() // Làm sạch khoảng trắng
          .escape() // Chống tấn công XSS
        break
      case 'email':
        chain = chain.isEmail().withMessage(`${rule.field} must be a valid email`).normalizeEmail() // Chuẩn hóa email
        break
      case 'int':
        chain = chain.isInt().withMessage(`${rule.field} must be an integer`)
        break
      case 'float':
        chain = chain.isFloat().withMessage(`${rule.field} must be a float`)
        break
      case 'boolean':
        chain = chain.isBoolean().withMessage(`${rule.field} must be a boolean`)
        break
      case 'date':
        chain = chain.isISO8601().toDate().withMessage(`${rule.field} must be a valid date (YYYY-MM-DD)`)
        break
      case 'array':
        chain = chain.isArray().withMessage(`${rule.field} must be an array`)
        break
      case 'object':
        chain = chain.isObject().withMessage(`${rule.field} must be an object`)
        break
    }

    return chain
  }

  // Middleware chính sẽ được Express sử dụng
  return async (req: Request, res: Response, next: NextFunction) => {
    // Chạy tất cả các chuỗi validation song song
    await Promise.all(rules.map((rule) => buildValidationChain(rule).run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next() // Không có lỗi, đi tiếp
    }

    // Có lỗi, trả về response 400
    res.status(400).json({
      message: 'Validation failed',
      errors: errors.mapped()
    })
  }
}

export default validationRules
