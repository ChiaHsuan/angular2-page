import { ExhAppPage } from './app.po';

describe('exh-app App', function() {
  let page: ExhAppPage;

  beforeEach(() => {
    page = new ExhAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
