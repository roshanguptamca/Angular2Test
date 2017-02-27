import { KpnYaraPage } from './app.po';

describe('kpn-yara App', () => {
  let page: KpnYaraPage;

  beforeEach(() => {
    page = new KpnYaraPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
