suite('Global Tests', function () {
  // 测试页面标题是否有效
  test('page has a valid title', function () {
    // 标题不为空、并且不为 TODO
    assert(document.title && document.title.match(/\S/) &&
      document.title.toUpperCase() !== 'TODO');
  });
});