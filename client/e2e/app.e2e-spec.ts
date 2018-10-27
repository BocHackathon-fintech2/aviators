import { AviatorsPage } from './app.po';

describe('aviators App', function() {
  let page: AviatorsPage;

  beforeEach(() => {
    page = new AviatorsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
