export const CATEGORY_TYPES = {
  EXPENSE: 'expense',
  INCOME: 'income',
};

export const TRANSACTION_TYPES = {
  EXPENSE: 'expense',
  INCOME: 'income',
};

export const REPEAT_TYPES = {
  DAY: 'Day',
  WEEK: 'Week',
  MONTH: 'Month',
};

export const REPEAT_SETTINGS = {
  MIN: 1,
  MAX: 32,
};

export const DEFAULT = {
  ICON: 'sell',
  CHART_COLOR: '#cccccc',
  CATEGORY_TYPE: 'expense',
  TRANSACTION_TYPE: 'expense',
  REPEAT_VALUE: 1,
  REPEAT_TYPE: 'Day',
  ORDER_STATUS: 'pending',
  USER_STORY_STATUS: 'planning'
};

export const ENTITY = {
  CATEGORY: 'Category',
  TRANSACTION: 'Transaction',
  PRODUCT: 'Product',
  ORDER: 'Order',
};

export const ORDER_STATUSES = {
  PENDING: 'pending',
  PREPARING: 'preparing',
  SERVING: 'serving',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const USER_STORY_STATUSES = {
  PLANNING: 'planning',
  ACTIVE: 'active',
  CLOSED: 'closed'
}