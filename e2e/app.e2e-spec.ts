import { WhackAShaiPage } from './app.po';

describe('whack-a-shai App', function() {
  let page: WhackAShaiPage;

  beforeEach(() => {
    page = new WhackAShaiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
