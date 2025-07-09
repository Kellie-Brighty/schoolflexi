import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Palette,
  Eye,
  Save,
  School,
  Users,
  BookOpen,
  Image,
  X,
  CheckCircle,
  RefreshCw,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface BrandingData {
  logo?: File | string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoUrl?: string;
}

const SchoolBranding: React.FC = () => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [brandingData, setBrandingData] = useState<BrandingData>({
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981", 
    accentColor: "#F59E0B",
    logoUrl: undefined,
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert('File size must be less than 2MB');
        return;
      }

      const logoUrl = URL.createObjectURL(file);
      setBrandingData(prev => ({
        ...prev,
        logo: file,
        logoUrl: logoUrl
      }));
    }
  };

  const handleColorChange = (colorType: keyof BrandingData, value: string) => {
    setBrandingData(prev => ({
      ...prev,
      [colorType]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call to save branding
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Implement actual API call to save branding data
      console.log('Saving branding data:', brandingData);
      
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('Failed to save branding:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const resetToDefaults = () => {
    setBrandingData({
      primaryColor: "#3B82F6",
      secondaryColor: "#10B981",
      accentColor: "#F59E0B",
      logoUrl: undefined,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const colorPresets = [
    { name: "Ocean Blue", primary: "#0284C7", secondary: "#0891B2", accent: "#0D9488" },
    { name: "Forest Green", primary: "#059669", secondary: "#10B981", accent: "#F59E0B" },
    { name: "Royal Purple", primary: "#7C3AED", secondary: "#A855F7", accent: "#EC4899" },
    { name: "Sunset Orange", primary: "#EA580C", secondary: "#F97316", accent: "#FBBF24" },
    { name: "Professional Navy", primary: "#1E40AF", secondary: "#3B82F6", accent: "#64748B" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            School Branding
          </h2>
          <p className="text-gray-600">
            Customize your school's visual identity and create a unique experience for your users.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.button
            onClick={resetToDefaults}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </motion.button>
          
          <motion.button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: isSaving ? 1 : 1.02 }}
            whileTap={{ scale: isSaving ? 1 : 0.98 }}
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-800 font-medium">
            Branding updated successfully! Changes will be visible across your school's system.
          </span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Logo Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Image className="w-5 h-5" />
              School Logo
            </h3>
            
            <div className="space-y-4">
              {brandingData.logoUrl ? (
                <div className="relative">
                  <img
                    src={brandingData.logoUrl}
                    alt="School Logo Preview"
                    className="w-32 h-32 object-contain border border-gray-200 rounded-lg bg-gray-50"
                  />
                  <button
                    onClick={() => {
                      setBrandingData(prev => ({ ...prev, logoUrl: undefined }));
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 transition-all"
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold text-primary-500">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 2MB</p>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              
              <p className="text-sm text-gray-500">
                Recommended: Square logo, 200x200px for best results
              </p>
            </div>
          </motion.div>

          {/* Color Scheme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Color Scheme
            </h3>

            {/* Color Presets */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Presets</h4>
              <div className="grid grid-cols-1 gap-2">
                {colorPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setBrandingData(prev => ({
                        ...prev,
                        primaryColor: preset.primary,
                        secondaryColor: preset.secondary,
                        accentColor: preset.accent,
                      }));
                    }}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50/30 transition-all"
                  >
                    <div className="flex gap-1">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.primary }} />
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.secondary }} />
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.accent }} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Colors */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={brandingData.primaryColor}
                    onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                    className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={brandingData.primaryColor}
                    onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    placeholder="#3B82F6"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={brandingData.secondaryColor}
                    onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                    className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={brandingData.secondaryColor}
                    onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    placeholder="#10B981"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accent Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={brandingData.accentColor}
                    onChange={(e) => handleColorChange('accentColor', e.target.value)}
                    className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={brandingData.accentColor}
                    onChange={(e) => handleColorChange('accentColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    placeholder="#F59E0B"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Live Preview */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Live Preview
              </h3>
              
              {/* Device Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                {[
                  { type: 'desktop' as const, icon: Monitor },
                  { type: 'tablet' as const, icon: Tablet },
                  { type: 'mobile' as const, icon: Smartphone },
                ].map(({ type, icon: Icon }) => (
                  <button
                    key={type}
                    onClick={() => setPreviewDevice(type)}
                    className={`p-2 rounded-md transition-colors ${
                      previewDevice === type
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Container */}
            <div className="bg-gray-100 rounded-lg p-4">
              <div 
                className={`bg-white rounded-lg shadow-lg overflow-hidden mx-auto transition-all ${
                  previewDevice === 'mobile' ? 'w-80' :
                  previewDevice === 'tablet' ? 'w-96' : 'w-full'
                }`}
              >
                {/* Header Preview */}
                <div 
                  className="p-4 text-white"
                  style={{ 
                    background: `linear-gradient(135deg, ${brandingData.primaryColor}, ${brandingData.secondaryColor})` 
                  }}
                >
                  <div className="flex items-center gap-3">
                    {brandingData.logoUrl ? (
                      <img 
                        src={brandingData.logoUrl} 
                        alt="Logo" 
                        className="w-8 h-8 object-contain bg-white/20 rounded-lg p-1"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <School className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <span className="font-bold">
                      {user?.schoolName || "Your School Name"}
                    </span>
                  </div>
                </div>

                {/* Content Preview */}
                <div className="p-4 space-y-4">
                  <div className="flex gap-2">
                    <div 
                      className="px-3 py-1 rounded-lg text-white text-sm font-medium"
                      style={{ backgroundColor: brandingData.primaryColor }}
                    >
                      Dashboard
                    </div>
                    <div 
                      className="px-3 py-1 rounded-lg text-white text-sm font-medium"
                      style={{ backgroundColor: brandingData.secondaryColor }}
                    >
                      Students
                    </div>
                    <div 
                      className="px-3 py-1 rounded-lg text-white text-sm font-medium"
                      style={{ backgroundColor: brandingData.accentColor }}
                    >
                      Reports
                    </div>
                  </div>

                  {/* Mini Dashboard Preview */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded flex items-center justify-center"
                          style={{ backgroundColor: `${brandingData.primaryColor}20` }}
                        >
                          <Users className="w-3 h-3" style={{ color: brandingData.primaryColor }} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Students</p>
                          <p className="text-sm font-bold">1,247</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded flex items-center justify-center"
                          style={{ backgroundColor: `${brandingData.secondaryColor}20` }}
                        >
                          <BookOpen className="w-3 h-3" style={{ color: brandingData.secondaryColor }} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Teachers</p>
                          <p className="text-sm font-bold">89</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-4 text-center">
              This preview shows how your branding will appear across the platform
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SchoolBranding; 