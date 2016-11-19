import { AngoidPage } from './app.po';

describe('angoid App', function() {
  let page: AngoidPage;

  beforeEach(() => {
    page = new AngoidPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
