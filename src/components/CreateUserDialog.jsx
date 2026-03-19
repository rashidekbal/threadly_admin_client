import React, { useState, useRef } from 'react';
import Dialog from './Dialog';
import { Camera, User, Mail, Phone, Lock, Calendar, FileText, ToggleLeft, ToggleRight, Wand2 } from 'lucide-react';
import { PulseLoader } from 'react-spinners';
import { createUser } from '../repository/Users.Repo';

export default function CreateUserDialog({ open, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    userid: '',
    username: '',
    email: '',
    phone: '',
    pass: '',
    bio: 'I use threadly daily',
    dob: '',
    isPrivate: false
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAutoGenerate = () => {
    const randomString = Math.random().toString(36).substring(2, 8);
    setFormData({
      userid: `user_${randomString}`,
      username: `Test User ${randomString}`,
      email: `test_${randomString}@example.com`,
      phone: `+1800${Math.floor(1000000 + Math.random() * 9000000)}`,
      pass: `Pass@${randomString}`,
      bio: 'I am a randomly generated test user.',
      dob: '2000-01-01',
      isPrivate: false
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.userid || formData.userid.trim().length < 3) {
      return setError('User ID must be at least 3 characters long.');
    }
    if (!formData.username || formData.username.trim() === '') {
      return setError('Username is required.');
    }
    if (!formData.pass || formData.pass.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }
    if (!formData.dob) {
      return setError('Date of Birth is required.');
    }
    
    // Optional fields validation
    if (!formData.email && !formData.phone) {
      return setError('Either an email address or a phone number must be provided.');
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return setError('Please enter a valid email address.');
    }
    if (formData.phone && formData.phone.replace(/\D/g, '').length < 7) {
      return setError('Please enter a valid phone number with at least 7 digits.');
    }

    setError(null);
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    
    if (selectedFile) {
      data.append('image', selectedFile);
    }

    createUser(data, {
      onSuccess: () => {
        setLoading(false);
        onSuccess();
        handleClose();
      },
      onError: (err) => {
        setLoading(false);
        setError(err?.response?.data?.message || err.message || 'Failed to create user');
      }
    });
  };

  const handleClose = () => {
    setFormData({
      userid: '',
      username: '',
      email: '',
      phone: '',
      pass: '',
      bio: 'I use threadly daily',
      dob: '',
      isPrivate: false
    });
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open}>
      <div className="bg-white max-h-[90vh] overflow-y-auto w-[600px] max-w-[95vw] rounded-2xl p-8 relative hide-scroll">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-700">Create New User</h2>
          <button 
            type="button" 
            onClick={handleAutoGenerate}
            className="flex items-center gap-2 text-sm text-violet-600 bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-lg transition-colors font-medium"
          >
            <Wand2 size={16} />
            Auto Generate
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center mb-2">
            <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleFileSelect} />
            <div 
              className="w-24 h-24 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-violet-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-slate-400">
                  <Camera size={24} />
                  <span className="text-[10px] mt-1 text-center leading-tight">Add Photo<br/>(Optional)</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* User ID */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-500 font-semibold" htmlFor="userid">User ID *</label>
              <div className="flex items-center border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 transition-all">
                <User size={18} className="text-slate-400 mr-2" />
                <input required type="text" id="userid" name="userid" value={formData.userid} onChange={handleChange} className="bg-transparent outline-none w-full text-sm placeholder:text-slate-400" placeholder="e.g. at_john" />
              </div>
            </div>

            {/* Username */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-500 font-semibold" htmlFor="username">Username *</label>
              <div className="flex items-center border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 transition-all">
                <User size={18} className="text-slate-400 mr-2" />
                <input required type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="bg-transparent outline-none w-full text-sm placeholder:text-slate-400" placeholder="John Doe" />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-500 font-semibold" htmlFor="email">Email</label>
              <div className="flex items-center border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 transition-all">
                <Mail size={18} className="text-slate-400 mr-2" />
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="bg-transparent outline-none w-full text-sm placeholder:text-slate-400" placeholder="john@example.com" />
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-500 font-semibold" htmlFor="phone">Phone</label>
              <div className="flex items-center border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 transition-all">
                <Phone size={18} className="text-slate-400 mr-2" />
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="bg-transparent outline-none w-full text-sm placeholder:text-slate-400" placeholder="+123456789" />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-500 font-semibold" htmlFor="pass">Password *</label>
              <div className="flex items-center border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 transition-all">
                <Lock size={18} className="text-slate-400 mr-2" />
                <input required type="text" id="pass" name="pass" value={formData.pass} onChange={handleChange} className="bg-transparent outline-none w-full text-sm placeholder:text-slate-400" placeholder="Secure Password" />
              </div>
            </div>

            {/* DOB */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-500 font-semibold" htmlFor="dob">Date of Birth *</label>
              <div className="flex items-center border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 transition-all">
                <Calendar size={18} className="text-slate-400 mr-2" />
                <input required type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} className="bg-transparent outline-none w-full text-sm placeholder:text-slate-400" />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-500 font-semibold" htmlFor="bio">Bio</label>
            <div className="flex border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 transition-all">
              <FileText size={18} className="text-slate-400 mr-2 mt-0.5 shrink-0" />
              <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows="2" className="bg-transparent outline-none w-full text-sm placeholder:text-slate-400 resize-none" placeholder="Tell us about this user..." />
            </div>
          </div>

          {/* isPrivate Toggle */}
          <div className="flex items-center justify-between border border-slate-300 rounded-xl px-4 py-3 bg-slate-50">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-600">Private Account</span>
              <span className="text-[11px] text-slate-400">If private, only approved followers can see posts</span>
            </div>
            <button type="button" onClick={() => setFormData(p => ({ ...p, isPrivate: !p.isPrivate }))} className="text-violet-600 focus:outline-none">
              {formData.isPrivate ? <ToggleRight size={36} /> : <ToggleLeft size={36} className="text-slate-300" />}
            </button>
          </div>

          {error && <div className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded-md">{error}</div>}

          {/* Actions */}
          <div className="flex gap-4 mt-4">
            <button type="button" className="w-full py-2.5 rounded-xl text-slate-500 font-semibold hover:bg-slate-100 transition-colors" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" disabled={loading} className="w-full py-2.5 rounded-xl bg-violet-600 font-semibold text-white hover:bg-violet-700 transition-colors flex justify-center items-center">
              {loading ? <PulseLoader size={8} color="white" /> : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
