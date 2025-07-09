import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  CheckCircle,
  Download,
  AlertCircle,
  Users,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const BulkImportPage: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const processingSteps = [
    "Validating CSV format",
    "Checking email addresses",
    "Verifying role assignments",
    "Preparing invitations",
    "Sending invitations",
  ];

  const mockResults = {
    total: 25,
    successful: 22,
    failed: 3,
    errors: [
      { row: 5, email: "invalid-email", error: "Invalid email format" },
      { row: 12, email: "duplicate@email.com", error: "Email already exists" },
      {
        row: 18,
        email: "missing@fields.com",
        error: "Missing required fields",
      },
    ],
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
  };

  const handleProcessFile = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setProcessingStep(0);

    // Simulate processing steps
    for (let i = 0; i < processingSteps.length; i++) {
      setProcessingStep(i);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    setIsProcessing(false);
    setShowResults(true);
  };

  const downloadSampleCSV = () => {
    const csvContent = `email,role,first_name,last_name,department,class_grade,student_id,employee_id
john.doe@email.com,teacher,John,Doe,Mathematics,,EMP001,
jane.smith@email.com,teacher,Jane,Smith,Science,,EMP002,
student1@email.com,student,Alice,Johnson,,grade-10,STU001,
student2@email.com,student,Bob,Williams,,grade-11,STU002,
parent1@email.com,parent,David,Brown,,,,
secretary@email.com,secretary,Linda,Davis,,,,`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_bulk_import.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Upload className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bulk Import</h1>
            <p className="text-gray-600">
              Import multiple users at once using a CSV file.
            </p>
          </div>
        </div>
      </motion.div>

      {!showResults ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Upload CSV File
            </h3>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-primary-400 bg-primary-50"
                  : "border-gray-300"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="space-y-4">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {uploadedFile.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {(uploadedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="text-primary-500 hover:text-primary-600 text-sm font-medium"
                  >
                    Choose different file
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold text-primary-500">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      CSV files only, max 5MB
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label
                    htmlFor="csv-upload"
                    className="inline-block bg-primary-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-600 transition-colors"
                  >
                    Select File
                  </label>
                </div>
              )}
            </div>

            {uploadedFile && (
              <div className="mt-6">
                <button
                  onClick={handleProcessFile}
                  disabled={isProcessing}
                  className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Process Invitations
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Processing Steps */}
            {isProcessing && (
              <div className="mt-6 space-y-3">
                {processingSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      index < processingStep
                        ? "bg-green-50 text-green-700"
                        : index === processingStep
                        ? "bg-primary-50 text-primary-700"
                        : "bg-gray-50 text-gray-500"
                    }`}
                  >
                    {index < processingStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : index === processingStep ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                    )}
                    <span className="text-sm font-medium">{step}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              CSV Format Instructions
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Required Columns:
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    • <code className="bg-gray-100 px-1 rounded">email</code> -
                    Email address
                  </li>
                  <li>
                    • <code className="bg-gray-100 px-1 rounded">role</code> -
                    teacher, student, parent, secretary, admin
                  </li>
                  <li>
                    •{" "}
                    <code className="bg-gray-100 px-1 rounded">first_name</code>{" "}
                    - First name
                  </li>
                  <li>
                    •{" "}
                    <code className="bg-gray-100 px-1 rounded">last_name</code>{" "}
                    - Last name
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Optional Columns:
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    •{" "}
                    <code className="bg-gray-100 px-1 rounded">department</code>{" "}
                    - For teachers
                  </li>
                  <li>
                    •{" "}
                    <code className="bg-gray-100 px-1 rounded">
                      class_grade
                    </code>{" "}
                    - For students
                  </li>
                  <li>
                    •{" "}
                    <code className="bg-gray-100 px-1 rounded">student_id</code>{" "}
                    - For students
                  </li>
                  <li>
                    •{" "}
                    <code className="bg-gray-100 px-1 rounded">
                      employee_id
                    </code>{" "}
                    - For staff
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-1">
                      Important Notes:
                    </h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• All email addresses must be unique</li>
                      <li>
                        • Role values must be exactly: teacher, student, parent,
                        secretary, admin
                      </li>
                      <li>• First and last names are required for all users</li>
                      <li>• Maximum 100 users per import</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={downloadSampleCSV}
                  className="flex items-center gap-2 text-primary-500 hover:text-primary-600 text-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  Download Sample CSV
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        /* Results Section */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Results Summary */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Import Results
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">
                    Total Processed
                  </span>
                </div>
                <p className="text-2xl font-bold text-blue-700">
                  {mockResults.total}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    Successful
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-700">
                  {mockResults.successful}
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-red-600">
                    Failed
                  </span>
                </div>
                <p className="text-2xl font-bold text-red-700">
                  {mockResults.failed}
                </p>
              </div>
            </div>

            {mockResults.failed > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-800 mb-3">Errors Found:</h4>
                <div className="space-y-2">
                  {mockResults.errors.map((error, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded font-mono">
                        Row {error.row}
                      </span>
                      <span className="text-red-700">{error.email}</span>
                      <ArrowRight className="w-4 h-4 text-red-500" />
                      <span className="text-red-600">{error.error}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  setShowResults(false);
                  setUploadedFile(null);
                }}
                className="flex-1 bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Import Another File
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download Error Report
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BulkImportPage;
