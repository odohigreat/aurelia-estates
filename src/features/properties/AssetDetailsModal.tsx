import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PropertyDetailsContent } from './PropertyDetailsContent';
import type { Property } from '../../types';

interface AssetDetailsModalProps {
  property: Property | null;
  onClose: () => void;
}

export function AssetDetailsModal({ property, onClose }: AssetDetailsModalProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const titleId = React.useId();
  const isOpen = property !== null;
  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement && opener.isConnected) {
        opener.focus({ preventScroll: true });
      }
    };
  }, [isOpen]);

  if (!property) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-modal="true"
      aria-labelledby={titleId}
      className="asset-dialog fixed inset-0 m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 text-inherit"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
    >
      <AnimatePresence>
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-200/80"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-white border border-border/50 rounded-2xl shadow-2xl overflow-y-auto flex flex-col"
          >
            <PropertyDetailsContent property={property} titleId={titleId} headerAction={
              <button ref={closeButtonRef} type="button" aria-label="Close property details" onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            } />
            <div className="px-6 pb-6 sm:px-10">
              <Link className="text-primary underline underline-offset-4" to={`/properties/${property.id}`}>View property page</Link>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </dialog>
  );
}
