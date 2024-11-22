// PrintService.js
import { BLEPrinter } from 'react-native-thermal-receipt-printer';

let printerConnected = false;

export const setupPrinter = async () => {
  try {
    await BLEPrinter.init();
    const devices = await BLEPrinter.getDeviceList();
    if (devices.length > 0) {
      await BLEPrinter.connectPrinter(devices[0].macAddress);
      printerConnected = true;
      console.log('Printer connected successfully');
    } else {
      console.error('No Bluetooth devices found');
    }
  } catch (error) {
    console.error('Error setting up printer:', error);
  }
};

export const printLabel = async (label) => {
  if (!printerConnected) {
    throw new Error('Printer is not connected');
  }

  try {
    const labelContent = `
    ORDER # ${label.order_nr}
    ITEM # ${label.item_number}
    ${label.item_description}
    PLANT DATE: ${label.plant_date}
    ____/${label.quantity} QTY
    ____ of ____ BOXES
    `;

    await BLEPrinter.printText(labelContent);
    console.log('Label printed successfully');
  } catch (error) {
    console.error('Error printing label:', error);
    throw error;
  }
};
