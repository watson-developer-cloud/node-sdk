module.exports = {
  'subject': 'phone',
  'columns': [{
    'key': 'price',
    'full_name': 'Price (Eur)',
    'type': 'NUMERIC',
    'is_objective': true,
    'goal': 'MIN'
  }, {
    'key': 'RAM',
    'full_name': 'RAM (MB)',
    'type': 'NUMERIC',
    'is_objective': false,
    'goal': 'MAX'
  }, {
    'key': 'screen_size',
    'full_name': 'Screen size (inch)',
    'type': 'NUMERIC',
    'is_objective': true,
    'goal': 'MAX'
  }, {
    'key': 'camera',
    'full_name': 'Camera (MP)',
    'type': 'NUMERIC',
    'is_objective': true,
    'goal': 'MAX'
  }, {
    'key': 'memory_size',
    'full_name': 'Memory size (GB)',
    'type': 'NUMERIC',
    'is_objective': false,
    'goal': 'MAX'
  }, {
    'key': 'battery',
    'full_name': 'Battery (mAh)',
    'type': 'NUMERIC',
    'is_objective': false,
    'goal': 'MAX'
  }, {
    'key': 'weight',
    'full_name': 'Weight (gr)',
    'type': 'NUMERIC',
    'is_objective': true,
    'goal': 'MIN'
  }],
  'options': [{
    'key': ' 1',
    'name': 'Samsung Galaxy S4 White',
    'values': {
      'weight': 130,
      'price': 239,
      'RAM': 2048,
      'battery': 2600,
      'camera': 13,
      'memory_size': 16,
      'screen_size': 5
    }
  }, {
    'key': '2',
    'name': 'Samsung Galaxy S4 Black',
    'values': {
      'weight': 130,
      'price': 239,
      'RAM': 2048,
      'battery': 2600,
      'camera': 13,
      'memory_size': 16,
      'screen_size': 5
    }
  }, {
    'key': '3',
    'name': 'Samsung Galaxy S3 White',
    'values': {
      'weight': 133,
      'price': 79,
      'RAM': 2048,
      'battery': 2100,
      'camera': 8,
      'memory_size': 16,
      'screen_size': 4.8
    }
  }]
};