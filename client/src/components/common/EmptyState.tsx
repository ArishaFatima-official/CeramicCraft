type Props = {
  message?: string;
};

const EmptyState = ({
  message = "No data found.",
}: Props) => {
  return (
    <div className="text-center py-5">
      <h5 className="fw-semibold text-muted">
        {message}
      </h5>
    </div>
  );
};

export default EmptyState;