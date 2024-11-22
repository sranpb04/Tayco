import RNHTMLtoPDF from 'react-native-html-to-pdf';

export const generatePdfFromData = async (orderData) => {
  try {
    // Create an HTML structure for the PDF
    const htmlContent = orderData.map(order => `
      <h1>Order Number: ${order.order_nr}</h1>
      <p><strong>Item Number:</strong> ${order.item_number}</p>
      <p><strong>Description:</strong> ${order.item_description}</p>
      <p><strong>Plant Date:</strong> ${order.plant_date}</p>
      <p><strong>Quantity:</strong> ${order.quantity}</p>
      <hr />
    `).join('');
    
    // Generate PDF
    const options = {
      html: htmlContent,
      fileName: 'order_labels',
      directory: '/Internal storage/Documents',  // <-- Change this to your desired directory
    };

    const file = await RNHTMLtoPDF.convert(options);
    return file.filePath;  // Returns the file path of the generated PDF
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
