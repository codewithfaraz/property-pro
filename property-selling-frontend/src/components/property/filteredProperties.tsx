import { Modal } from "rizzui";
export default function FilteredProperties({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="bg-white">
      <h1>Filtered Properties here</h1>
    </Modal>
  );
}
