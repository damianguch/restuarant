import { Alert } from '../../components/elements/Alert';
const PaymentSuccess = () => {
  return (
    <div className="max-w-lg mx-auto p-4">
      <Alert variant="success">
        Your payment was successful. We appreciate your business!
      </Alert>
    </div>
  );
};

export default PaymentSuccess;
