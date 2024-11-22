import Svg from 'react-native-svg';
import Barcode from 'react-native-barcode-svg';

export const generateBarcode = (orderNumber) => {
  return (
    <Svg height="30" width="200">
      <Barcode value={orderNumber} format="EAN13" />
    </Svg>
  );
};
