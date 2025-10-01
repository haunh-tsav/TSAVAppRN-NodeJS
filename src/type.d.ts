export type UserRoleType =
  | 'admin'
  | 'product_manager'
  | 'importation_manager'
  | 'sample_sewing_manager'
  | 'accessory_manager'
  | 'cutting_group_manager'
  | 'completion_manager'
  | 'sewing_line_manager'
  | 'staff'

export type RequestBodyType = {
  filter: {
    field: string
    items: number[] // items: mảng id : default -1: Lấy tất cả post
  }
  paginator: {
    page: number // trang hiện tại : default = 1
    pageSize: number // số lượng post cần lấy : default = 10
  }
  search: {
    field: string
    term: string
  }
  sorting: {
    column: string // Ví dụ: Id
    direction: 'asc' | 'desc' // direction: asc|desc sắp xếp trước sau
  }
}

export type ErrorType = {
  error: string
  errorDetail: string
}
