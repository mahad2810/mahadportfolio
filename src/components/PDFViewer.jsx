import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

const PDFViewer = ({ pdfFile, projectName, isOpen, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfFile;
    link.download = `${projectName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative w-[95vw] h-[95vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <h3 className="text-xl font-bold">{projectName}</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={20} />
              </button>
              <span className="px-3 py-1 bg-white/20 rounded-lg text-sm">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={20} />
              </button>
              <button
                onClick={handleRotate}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                title="Rotate"
              >
                <RotateCw size={20} />
              </button>
              <button
                onClick={handleDownload}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                title="Download PDF"
              >
                <Download size={20} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* PDF Content */}
          <div className="flex-1 overflow-auto p-4 bg-gray-100">
            <div className="flex justify-center">
              <div
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  transformOrigin: 'center',
                  transition: 'transform 0.3s ease'
                }}
              >
                <iframe
                  src={`${pdfFile}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-[800px] h-[1000px] border-0 shadow-lg rounded-lg"
                  title={`${projectName} PDF`}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PDFViewer;
