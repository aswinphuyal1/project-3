import React from "react";
import {
  Upload,
  ChevronDown,
  LayoutGrid,
  FileText,
  Plus,
  Check,
} from "lucide-react";

/**
 * UploadNotesComponent
 * A self-contained component for the knowledge-sharing platform.
 * Uses Tailwind CSS and Lucide-React.
 */
const UploadNotesComponent = () => {
  // --- Internal Reusable Sub-Components ---

  const FormInput = ({
    placeholder,
    icon: Icon,
    label,
  }: {
    placeholder: string;
    icon?: any;
    label?: string;
  }) => (
    <div className="w-full space-y-1">
      {label && (
        <label className="text-sm font-semibold text-[#222222]/70 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-[#FAF3E1] border border-transparent rounded-xl py-3 px-4 text-[#222222] placeholder-[#222222]/40 focus:outline-none focus:ring-2 focus:ring-[#FF6D1F]/20 transition-all"
        />
        {Icon && (
          <Icon className="absolute right-4 top-3.5 text-[#222222]/40 w-5 h-5" />
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8">
      {/* Main Container - White Background as requested */}
      <div className="bg-white w-full max-w-5xl rounded-[2.5rem] shadow-xl p-8 md:p-14 relative overflow-hidden">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-10">
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold text-[#222222] tracking-tight">
              Upload New Notes
            </h1>
            <h2 className="text-2xl font-medium text-[#222222]/80">
              Mathematics
            </h2>
          </div>
          <button className="text-[#FF6D1F] bg-[#FAF3E1] hover:bg-[#F5E7C6] transition-colors px-5 py-1.5 rounded-lg text-sm font-bold shadow-sm">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: File Upload & Actions */}
          <div className="flex flex-col space-y-8">
            {/* Drag & Drop Area */}
            <div className="border-2 border-dashed border-[#222222]/10 rounded-[2rem] p-12 flex flex-col items-center justify-center bg-white hover:border-[#FF6D1F] transition-all cursor-pointer group">
              <div className="bg-[#FF6D1F] p-5 rounded-2xl mb-6 shadow-lg shadow-[#FF6D1F]/30 group-hover:scale-110 transition-transform">
                <Upload className="text-white w-10 h-10" />
              </div>
              <p className="text-[#222222] text-lg font-medium text-center leading-relaxed">
                Drag & Drop your files
                <br />
                here or{" "}
                <span className="text-[#FF6D1F] font-bold underline decoration-2 underline-offset-4">
                  Browse
                </span>
              </p>
            </div>

            {/* Constraints/Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#222222]/60 font-medium">
                <div className="w-6 h-6 rounded-md bg-[#FAF3E1] flex items-center justify-center border border-[#222222]/10">
                  <Check
                    className="w-3.5 h-3.5 text-[#222222]"
                    strokeWidth={3}
                  />
                </div>
                <span>PDF, DOCX, PNG, JPG</span>
              </div>
              <div className="flex items-center gap-3 text-[#222222]/60 font-medium">
                <div className="w-6 h-6 rounded-md bg-[#FAF3E1] flex items-center justify-center border border-[#222222]/10">
                  <div className="w-2 h-2 bg-[#222222]/40 rounded-full"></div>
                </div>
                <span>Support size 10MB/file</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button className="flex-1 bg-[#FF6D1F] text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[#FF6D1F]/30 active:scale-[0.98] transition-all">
                Download Note
              </button>
              <button className="flex-1 border-2 border-[#FF6D1F] text-[#FF6D1F] py-4 rounded-xl font-bold text-lg hover:bg-[#FF6D1F]/5 active:scale-[0.98] transition-all">
                Publish Notes
              </button>
            </div>
          </div>

          {/* Right Column: Form Details */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-xl font-bold text-[#222222] pb-2 border-b-2 border-[#FAF3E1] inline-block w-fit">
              Note Details
            </h3>

            <div className="space-y-4">
              <FormInput placeholder="Title" icon={ChevronDown} />
              <FormInput placeholder="Description" icon={ChevronDown} />

              <div className="grid grid-cols-1 gap-4 pt-2">
                <FormInput
                  label="Subject"
                  placeholder="Subject"
                  icon={LayoutGrid}
                />
                <FormInput
                  label="Semester"
                  placeholder="Semester"
                  icon={LayoutGrid}
                />
              </div>
            </div>

            {/* Tags Toggle Style */}
            <div className="flex items-center justify-between py-2 group cursor-pointer">
              <span className="font-bold text-[#222222]/80">Tags</span>
              <div className="flex flex-col gap-1 items-end">
                <div className="w-5 h-0.5 bg-[#222222]/30 group-hover:bg-[#FF6D1F] transition-colors"></div>
                <div className="w-3 h-0.5 bg-[#222222]/30 group-hover:bg-[#FF6D1F] transition-colors"></div>
              </div>
            </div>

            {/* File Info Bar */}
            <div className="bg-[#FAF3E1] rounded-xl px-5 py-3.5 flex justify-between items-center border border-[#F5E7C6]">
              <span className="text-[#222222]/50 font-medium">
                Preview Image
              </span>
              <span className="text-[#222222] font-black tracking-tighter">
                5.6 KB
              </span>
            </div>

            {/* Preview Card */}
            <div className="bg-[#F5E7C6]/40 border border-[#F5E7C6] rounded-2xl p-4 flex items-center justify-between group hover:bg-[#F5E7C6]/60 transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                  <FileText className="text-[#222222]/30 w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-[#222222]/40 font-bold uppercase tracking-widest italic">
                      / Preview Image
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#222222]/70">
                    (os the tiplales)
                  </p>
                </div>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-[#222222]/5 shadow-sm">
                <div className="w-5 h-5 bg-[#222222]/20 rounded-md"></div>
              </div>
            </div>

            {/* Add More Action */}
            <button className="flex items-center gap-3 text-[#222222]/40 font-bold text-sm hover:text-[#FF6D1F] transition-colors w-fit group">
              <div className="bg-[#222222]/10 group-hover:bg-[#FF6D1F]/10 p-1 rounded-full transition-colors">
                <Plus className="w-4 h-4" strokeWidth={3} />
              </div>
              Preview Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadNotesComponent;
