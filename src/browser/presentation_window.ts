import * as electron from 'electron';
import {EVENTS} from './../constants/events';
import MainWindow from './../browser/main_window';
const ipc: Electron.IPCMain = electron.ipcMain;

export default class PresentationWindow {
  private window: Electron.BrowserWindow;
  private text: string;
  private static instance: PresentationWindow;

  constructor() {
    if (PresentationWindow.instance) throw new Error('must use the getInstance.');
    ipc.on(EVENTS.PRESENTATION_WINDOW.RENDERER.REQUEST_START_PRESENTATION, this.hanldRequestStartPresentation.bind( this ) );
    ipc.on(EVENTS.PRESENTATION_WINDOW.RENDERER.REQUEST_MESSAGE, (ev: Electron.IPCMainEvent) => {
      ev.returnValue = this.text;
    });
  };

  public static createInstance() {
    if (!PresentationWindow.instance) {
      PresentationWindow.instance = new PresentationWindow();
    }
  }

  public static getInstance(): PresentationWindow {
    this.createInstance();
    return PresentationWindow.instance;
  }

  public createWindow() {
    if (this.window) return;
    this.text = MainWindow.getInstance().getText();
    this.window  = new electron.BrowserWindow( { width: 940, height: 740, minWidth: 940, minHeight: 740, resizable: true } );
    this.window.loadURL('file://' + __dirname + '/../renderer/presentation_window.html');
    this.window.on('closed', () => { this.window = null; });
  }

  private hanldRequestStartPresentation( _ev: Electron.IPCMainEvent) {
    this.createWindow();
  }
}
