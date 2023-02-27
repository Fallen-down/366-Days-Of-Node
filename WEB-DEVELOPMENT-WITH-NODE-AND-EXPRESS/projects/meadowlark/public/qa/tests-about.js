suite('"About" Page Tests', function () {
  test('page should contain link to contact page', function () {
    // 是否由 contact 的链接
    assert($('a[href="/contact"]').length);
  });
});