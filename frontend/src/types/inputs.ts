export const inputs = [
  {
    id: 1,
    name: 'firstName',
    type: 'text',
    placeholder: 'First name',
    errorMessage: 'Max 20 characters. Allowed: A-Z a-z',
    label: '* First name',
    pattern: '^[A-Za-z]{1,20}$',
    required: true
  },
  {
    id: 2,
    name: 'lastName',
    type: 'text',
    placeholder: 'Last name',
    errorMessage: 'Max 20 characters. Allowed: A-Z a-z',
    label: '* Last name',
    pattern: '^[A-Za-z]{1,20}$',
    required: true
  },
  {
    id: 3,
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    errorMessage: 'Should be a valid email with max length 42',
    label: '* Email',
    pattern: '^(?=.{1,42}$)\\S+@\\S+\\.\\S+$',
    required: true
  },
  {
    id: 4,
    name: 'birthday',
    type: 'date',
    placeholder: 'Birthday',
    label: 'Birthday',
    max: new Date().toISOString().split('T')[0]
  },
  {
    id: 5,
    name: 'comment',
    type: 'textarea',
    placeholder: 'Comment',
    label: 'Comment',
    multiline: true
  }
];
