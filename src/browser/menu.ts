import * as electron from 'electron';
import FileManager from './file_manager';
import MainWindow from './main_window';
import PresentationWindow from './presentation_window';
import ExportWindow from './export_window';
import { Menu } from 'electron';

const app = electron.app;

const setMenu = (mainWindow: MainWindow) => {
  const buildedMenu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        { label: 'New File', accelerator: 'Command+N', click: () => {
          FileManager.getInstance().resetFile();
        }},
        { label: 'Open...' , accelerator: 'Command+O', click: () => {
          FileManager.getInstance().openFile();
        }},
        { type: 'separator' },
        { label: 'Save', accelerator: 'Command+S', click: () => {
          FileManager.getInstance().saveFile();
        }},
        { label: 'Save As...', click: () => {
          FileManager.getInstance().saveAsNewFile();
        }},
        { type: 'separator' },
        { label: 'Export To PDF', click: () => {
          ExportWindow.getInstance().createWindow(MainWindow.getInstance().getText());
        }},
        { type: 'separator' },
        { label: 'Quit', accelerator: 'Command+Q', click: () => app.quit() }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
      ]
    },
    {
      label: 'Play',
      submenu: [
        { label: 'Play Slideshow', accelerator: 'Command+P', click: () => PresentationWindow.getInstance().createWindow() }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: function() { mainWindow.getBrowserWindow().webContents.toggleDevTools(); }
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(buildedMenu);
};

export default setMenu;
