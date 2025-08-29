"use client"

import React, { useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UploadResume() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMessage("");
    setUploading(true);
    try {
      // 1. Upload to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `${fileName}`;
      // Ensure bucket exists (Supabase auto-creates on first upload if not exists)
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });
      if (uploadError) throw uploadError;
      // 2. Get public URL
      const { data: publicUrlData } = supabase.storage.from("resumes").getPublicUrl(filePath);
      const fileUrl = publicUrlData.publicUrl;
      // 3. Insert metadata into resumes table
      const { error: insertError } = await supabase.from("resumes").insert([
        { file_name: file.name, file_url: fileUrl },
      ]);
      if (insertError) throw insertError;
      setMessage("✅ Resume uploaded successfully!");
      inputRef.current.value = "";
    } catch (err) {
      setMessage(`❌ Upload failed: ${err.message || err}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-xl shadow-lg border border-muted flex flex-col items-center">
      <label className="block w-full">
        <span className="block mb-2 text-lg font-semibold text-foreground">Upload Resume</span>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 disabled:opacity-50"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>
      <button
        type="button"
        className="mt-4 w-full py-2 px-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition disabled:opacity-50"
        onClick={() => inputRef.current && inputRef.current.click()}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </button>
      {message && (
        <div className={`mt-4 text-center ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>{message}</div>
      )}
    </div>
  );
}
