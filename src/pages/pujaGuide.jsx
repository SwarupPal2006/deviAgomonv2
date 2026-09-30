import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Navigation, 
  Train, 
  Bus, 
  Clock, 
  Sparkles, 
  Search, 
  Filter, 
  X,
  Compass, 
  Bookmark, 
  ExternalLink,
  ShieldAlert, 
  Info, 
  ChevronRight, 
  Layers
} from 'lucide-react';

// Custom Subway Icon Component
const Subway = ({ className = "w-5 h-5", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect width="16" height="16" x="4" y="3" rx="2" />
    <path d="M4 11h16" />
    <path d="M12 3v8" />
    <path d="m8 19-3 3" />
    <path d="m18 22-3-3" />
    <circle cx="8" cy="15" r="1" />
    <circle cx="16" cy="15" r="1" />
  </svg>
);

const PUJA_DATA = [
  // --- NORTH CALCUTTA ---
  {
    id: 'north-1',
    name: 'বাগবাজার সার্বজনীন দুর্গোৎসব',
    category: 'উত্তর কলকাতা',
    location: 'বাগবাজার, শ্যামবাজার',
    address: 'বাগবাজার ঘাট রোড, সার্কুলার রেলওয়ে স্টেশনের কাছে, কলকাতা',
    theme2026: 'ঐতিহ্যবাহী সাবেকী একচালা প্রতিমা ও শতবর্ষের বাঙালি ঐতিহ্য',
    themeDescription: 'একশ বছরেরও বেশি পুরনো ঐতিহ্য রক্ষার্থে বাগবাজার বিখ্যাত। এখানে আধুনিক কোন থিম থাকে না; শুধু ডাকের সাজে সজ্জিত সাবেকি একচালা দুর্গা প্রতিমা ও ঐতিহ্যবাহী সংস্কৃতি তুলে ধরা হয়।',
    idolStyle: 'সাবেকী একচালা প্রতিমা সঙ্গে রুপোর ডাকের সাজ',
    mapsQuery: 'Bagbazar Sarbojanin Durgotsav Kolkata',
    transit: {
      metro: { name: 'শ্যামবাজার মেট্রো স্টেশন', distance: '৮০০ মিটার', detail: '২ নং গেট দিয়ে বেরিয়ে ১০ মিনিট হাঁটা পথ অথবা ৩ মিনিটের অটো।' },
      road: { name: 'বাগবাজার বাস স্টপ / রবীন্দ্র সরণি', distance: '২০০ মিটার', detail: 'রবীন্দ্র সরণি ও বি.টি. রোডে প্রচুর বাস উপলব্ধ।' },
      train: { name: 'বাগবাজার সার্কুলার রেলওয়ে স্টেশন', distance: '১৫০ মিটার', detail: 'শিয়ালদহ সার্কুলার ট্রেনের মাধ্যমে সরাসরি পৌঁছানো যায়।' }
    },
    bestOption: 'মেট্রো',
    crowdLevel: 'প্রচুর ভিড়',
    bestTime: 'সকাল ৬:০০ - সকাল ১০:০০ (শান্তিতে দেখার সেরা সময়)',
    highlights: ['১০০+ বছরের ঐতিহ্য', 'নবমীতে ঐতিহ্যবাহী ধুনুচি নাচ', 'ঐতিহাসিক মেলার প্রাঙ্গণ']
  },
  {
    id: 'north-2',
    name: 'আহিরীটোলা সার্বজনীন দুর্গোৎসব',
    category: 'উত্তর কলকাতা',
    location: 'আহিরীটোলা, বি.কে. পাল এভিনিউ',
    address: '৮৩ আহিরীটোলা স্ট্র his, বি.কে. পাল এভিনিউ ক্রসিং, কলকাতা',
    theme2026: 'গঙ্গার ঘাট ও কুমারটুলির মৃৎশিল্পীদের জীবনগাথা',
    themeDescription: 'হুগলী নদীর তীরের মাঝি ও প্রতিমা শিল্পীদের প্রতি শ্রদ্ধা জানিয়ে নির্মিত থিম। কাঠের অংশ ও মাটির ছাঁচ ব্যবহার করে অসাধারণ শিল্পকর্ম গড়ে তোলা হয়।',
    idolStyle: 'ফিউশন মাটির কারুকার্য',
    mapsQuery: 'Ahiritola Sarbojanin Durgotsab Kolkata',
    transit: {
      metro: { name: 'শোভাবাজার শুটানুটি মেট্রো', distance: '৬৫০ মিটার', detail: 'বি.কে. পাল এভিনিউ এর দিকে বেরিয়ে ৮ মিনিটের হাঁটা পথ।' },
      road: { name: 'বি.কে. পাল এভিনিউ বাস স্টপ', distance: '১০০ মিটার', detail: 'স্ট্র্যান্ড রোড ও সেন্ট্রাল এভিনিউ থেকে সরাসরি বাস।' },
      train: { name: 'আহিরীটোলা সার্কুলার রেলওয়ে স্টেশন', distance: '৩০০ মিটার', detail: 'আহিরীটোলা ফেরি ঘাট থেকে হাঁটা দূরত্ব।' }
    },
    bestOption: 'মেট্রো',
    crowdLevel: 'অত্যধিক ভিড়',
    bestTime: 'রাত ১:০০ - ভোর ৪:০০',
    highlights: ['কুমারটুলির কাছে অবস্থিত', 'গঙ্গার ঘাটের মনোরম পরিবেশ', 'বিশেষ লাইটিং']
  },
  {
    id: 'north-3',
    name: 'টালা প্রত্যয়',
    category: 'উত্তর কলকাতা',
    location: 'টালা, শ্যামবাজার',
    address: '২৩/২ বনমালী চ্যাটার্জী স্ট্রিট, টালা পার্ক, কলকাতা',
    theme2026: 'শব্দের নীরবতা - ইনস্টলেশন আর্ট অভিজ্ঞতা',
    themeDescription: 'আন্তর্জাতিক মানের আধুনিক সমসাময়িক ইনস্টলেশন আর্টের জন্য বিশ্বখ্যাত। প্রাকৃতিক আলো ও শব্দের বিন্যাসে এটি এক অপরূপ শিল্পকলার রূপ নেয়।',
    idolStyle: 'আধুনিক ভাস্কর্য শৈলীর প্রতিমা',
    mapsQuery: 'Tala Prattyay Kolkata',
    transit: {
      metro: { name: 'বেলগাছিয়া / শ্যামবাজার মেট্রো', distance: '১.১ কিমি', detail: 'বেলগাছিয়া মেট্রো ১ নং গেট থেকে টোটো বা অটো মিলবে।' },
      road: { name: 'টালা ব্রিজ বাস স্টপ', distance: '২৫০ মিটার', detail: 'বি.টি. রোডের সমস্ত বাস এখানে থামে।' },
      train: { name: 'টালা রেলওয়ে স্টেশন', distance: '৪০০ মিটার', detail: 'শিয়ালদহ উত্তর শাখার ট্রেন টালা স্টেশনে থামে।' }
    },
    bestOption: 'ট্রেন',
    crowdLevel: 'অত্যধিক ভিড়',
    bestTime: 'সকাল ৫:০০ - সকাল ৮:০০',
    highlights: ['আন্তর্জাতিক খ্যাতিসম্পন্ন থিম', 'বিশাল মুক্তাঙ্গন আর্ট', 'ইউনেস্কো পারিক্রমা কেন্দ্র']
  },
  {
    id: 'north-4',
    name: 'সন্তোষ মিত্র স্কয়ার',
    category: 'উত্তর কলকাতা',
    location: 'লেবু তলা পার্ক, শিয়ালদহ',
    address: 'নটবর দত্ত রো, লেবুতলা, বউবাজার / শিয়ালদহ, কলকাতা',
    theme2026: 'ফিউচারিস্টিক আর্কিটেকচারাল ডোম ও ৩ডি প্রজেকশন',
    themeDescription: 'অত্যাধুনিক লেজার প্রজেকশন, সোনায় মোড়া স্থাপত্য ও আলোকসজ্জার সাহায্যে এক স্বপ্নের প্রাসাদ তৈরি করা হয়। রাতে এটি দেখতে হাজার হাজার মানুষ ভিড় জমায়।',
    idolStyle: 'রাজকীয় স্বর্ণালী প্রতিমা',
    mapsQuery: 'Santosh Mitra Square Durga Puja Kolkata',
    transit: {
      metro: { name: 'সেন্ট্রাল মেট্রো / শিয়ালদহ মেট্রো', distance: '৬০০ মিটার', detail: 'সেন্ট্রাল মেট্রো স্টেশন থেকে ৫-৭ মিনিট হাঁটা পথ।' },
      road: { name: 'মুচিপাড়া / এম.জি. রোড বাস স্টপ', distance: '৩০০ মিটার', detail: 'এম.জি. রোড ও এ.জে.সি. বোস রোডের বাস।' },
      train: { name: 'শিয়ালদহ রেলওয়ে স্টেশন', distance: '৭০০ মিটার', detail: 'শিয়ালদহ স্টেশন থেকে ১০ মিনিটের সহজ হাঁটা পথ।' }
    },
    bestOption: 'ট্রেন',
    crowdLevel: 'চরম ভিড়',
    bestTime: 'রাত ২:০০ - ভোর ৫:০০ (আলোকসজ্জা দেখার সেরা সময়)',
    highlights: ['৩ডি লাইট প্রজেকশন', 'বিশাল স্থাপত্যের প্রতিরূপ', 'শিয়ালদহের কাছে অবস্থিত']
  },

  // --- SOUTH KOLKATA ---
  {
    id: 'south-1',
    name: 'একডালিয়া এভারগ্রীন ক্লাব',
    category: 'দক্ষিণ কলকাতা',
    location: 'গড়িয়াহাট, বালিগঞ্জ',
    address: '১৫ একডালিয়া রোড, গড়িয়াহাট ক্রসিং, কলকাতা',
    theme2026: 'দক্ষিণ ভারতীয় মন্দির স্থাপত্য ও ঝাড়বাতির কারুকার্য',
    themeDescription: 'দক্ষিণ ভারতের পাথরের মন্দিরের আদলে তৈরি মণ্ডপ এবং সাথে ঝুলন্ত ৪০ ফুট বিশালাকার ক্রিস্টাল ঝাড়বাতি। সাবেকী প্রতিমার আলোকসজ্জা নজরকাড়া।',
    idolStyle: 'ঐতিহ্যবাহী সনাতন প্রতিমা',
    mapsQuery: 'Ekdalia Evergreen Club Gariahat Kolkata',
    transit: {
      metro: { name: 'কালীঘাট মেট্রো স্টেশন', distance: '১.৪ কিমি', detail: 'রাসবিহারী মোড় থেকে গড়িয়াহাটের অটো পাওয়া যায়।' },
      road: { name: 'গড়িয়াহাট ক্রসিং বাস স্টপ', distance: '২০০ মিটার', detail: 'কলকাতার প্রায় সব প্রান্তের সাথে বাস যোগাযোগ রয়েছে।' },
      train: { name: 'বালিগঞ্জ জংশন স্টেশন', distance: '৮০০ মিটার', detail: '১০ মিনিটের হাঁটা পথ বা অটো।' }
    },
    bestOption: 'রাস্তা (বাস/অটো)',
    crowdLevel: 'চরম ভিড়',
    bestTime: 'সকাল ৭:০০ - সকাল ১০:০০',
    highlights: ['বিখ্যাত ক্রিস্টাল ঝাড়বাতি', 'গড়িয়াহাট স্ট্রিট ফুড', 'ঐতিহ্যবাহী আলোর তোরণ']
  },
  {
    id: 'south-2',
    name: 'সুরুচি সংঘ',
    category: 'দক্ষিণ কলকাতা',
    location: 'নিউ আলিপুর',
    address: 'ব্লক এম, নিউ আলিপুর, স্টেশন রোডের কাছে, কলকাতা',
    theme2026: 'উত্তর-পূর্ব ভারতের হস্তশিল্প ও পরিবেশবান্ধব ভাবনা',
    themeDescription: 'প্রতি বছর ভারতের কোন একটি রাজ্যের সংস্কৃতি তুলে ধরা হয়। ২০২৬ সালে আসাম ও ত্রিপুরার তাঁত, বাঁশ শিল্প ও লোকসঙ্গীতের মেলবন্ধন ঘটানো হচ্ছে।',
    idolStyle: 'লোকশিল্প শৈলীর হস্তনির্মিত প্রতিমা',
    mapsQuery: 'Suruchi Sangha New Alipore Kolkata',
    transit: {
      metro: { name: 'তারাতলা / রবীন্দ্র সরোবর মেট্রো', distance: '১.২ কিমি', detail: 'তারাতলা মেট্রো থেকে সরাসরি অটো মিলবে।' },
      road: { name: 'নিউ আলিপুর পেট্রোল পাম্প স্টপ', distance: '৩০০ মিটার', detail: 'ডায়মন্ড হারবার রোডের বাস।' },
      train: { name: 'মাজেরইাট / নিউ আলিপুর রেলওয়ে স্টেশন', distance: '৫০০ মিটার', detail: 'লোকাল ট্রেন স্টেশন থেকে স্বল্প দূরত্ব।' }
    },
    bestOption: 'মেট্রো',
    crowdLevel: 'অত্যধিক ভিড়',
    bestTime: 'রাত ১২:০০ - রাত ৩:০০',
    highlights: ['রাজ্যের সাংস্কৃতিক প্রদর্শনী', 'তারকাদের প্রিয় পুজো', 'পরিবেশবান্ধব উপকরণ']
  },
  {
    id: 'south-3',
    name: 'ত্রিধারা সম্মিলনী',
    category: 'দক্ষিণ কলকাতা',
    location: 'দেশপ্রিয় পার্ক / মনোহরপুকুর',
    address: 'মনোহরপুকুর রোড, ত্রিভূজ পার্কের কাছে, কলকাতা',
    theme2026: 'মাটির টেরা কোটা ও পিতলের ঘণ্টার ধ্বনি',
    themeDescription: 'আধুনিক ভাস্কর্য ও প্রাচীন পোড়ামাটির শিল্পের চমৎকার মিশ্রণ। হাজার হাজার পিতলের ঘণ্টার রিং মণ্ডপে এক স্বর্গীয় অনুভূতির সৃষ্টি করে।',
    idolStyle: 'টেরাকোটা ও ধাতব শিল্পের আধুনিক প্রতিমা',
    mapsQuery: 'Tridhara Sammilani Monoharpukur Kolkata',
    transit: {
      metro: { name: 'কালীঘাট মেট্রো স্টেশন', distance: '৭০০ মিটার', detail: '৩ নং গেট দিয়ে বেরিয়ে রাসবিহারী ধরে ত্রিভূজ পার্কের দিকে হেঁটে যান।' },
      road: { name: 'দেশপ্রিয় পার্ক / রাসবিহারী বাস স্টপ', distance: '২৫০ মিটার', detail: 'রাসবিহারী এভিনিউ দিয়ে সেরা যোগাযোগের মাধ্যম।' },
      train: { name: 'বালিগঞ্জ জংশন', distance: '১.৫ কিমি', detail: 'দেশপ্রিয় পার্কের অটো নিন।' }
    },
    bestOption: 'মেট্রো',
    crowdLevel: 'চরম ভিড়',
    bestTime: 'সকাল ৬:০০ - সকাল ৯:০০',
    highlights: ['শব্দ ও ঘণ্টার সুর', 'দক্ষিণ কলকাতার প্রাণকেন্দ্র', 'সহজ মেট্রো যোগাযোগ']
  },
  {
    id: 'south-4',
    name: 'চেতলা অগ্রণী ক্লাব',
    category: 'দক্ষিণ কলকাতা',
    location: 'চেতলা, কালীঘাট',
    address: '৪, চেতলা সেন্ট্রাল রোড, চেতলা, কলকাতা',
    theme2026: 'মাতৃ রূপেন - কাঁচা মাটির সৃষ্টি ও শিল্পীর প্রার্থনা',
    themeDescription: 'গঙ্গার খাঁটি মাটির প্রলেপ, কাঁচা খড় এবং প্রাকৃতিক সবজি রঞ্জক দিয়ে তৈরি পরিবেশবান্ধব সৃষ্টি। মায়ের রূপের আদি রূপকে এখানে তুলে ধরা হয়।',
    idolStyle: 'কাঁচা মাটির ইকো-বান্ধব ভাস্কর্য',
    mapsQuery: 'Chetla Agrani Club Kolkata',
    transit: {
      metro: { name: 'কালীঘাট / জতিন দাস পার্ক মেট্রো', distance: '৯০০ মিটার', detail: 'চেতলা লক গেট ব্রিজ হেঁটে বা অটোতে পার হন।' },
      road: { name: 'চেতলা সেন্ট্রাল রোড বাস স্টপ', distance: '১৫০ মিটার', detail: 'হাজরা মোড় থেকে স্থানীয় অটো।' },
      train: { name: 'মাজেরইাট রেলওয়ে স্টেশন', distance: '১.৮ কিমি', detail: 'চেতলা হয়ে অটো পাওয়া যাবে।' }
    },
    bestOption: 'মেট্রো',
    crowdLevel: 'প্রচুর ভিড়',
    bestTime: 'রাত ১১:০০ - রাত ২:০০',
    highlights: ['পরিবেশবান্ধব প্রতিমা', 'কালীঘাট মন্দিরের কাছে', 'বিশেষ আলোকসজ্জা']
  },

  // --- KAKDWIP (ALL MAJOR PUJA) ---
  {
    id: 'kakdwip-1',
    name: 'কাকদ্বীপ অমৃতায়ন সংঘ',
    category: 'কাকদ্বীপ',
    location: 'অমৃতায়ন ময়দান, কাকদ্বীপ শহর',
    address: 'অমৃতায়ন সংঘ ক্লাব গ্রাউন্ড, কাকদ্বীপ কোর্টের কাছে, কাকদ্বীপ, দক্ষিণ ২৪ পরগনা',
    theme2026: 'দিঘা জগন্নাথ ধাম মন্দির স্থাপত্য ও কাগজ শিল্প',
    themeDescription: 'দিঘার নতুন জগন্নাথ ধামের আদলে তৈরি বিশালাকার মণ্ডপ। ১ লক্ষেরও বেশি পুনর্ব্যবহারযোগ্য কাগজের কাপ ও বাঁশ ব্যবহার করে প্লাস্টিক মুক্ত পরিবেশের বার্তা দেওয়া হচ্ছে।',
    idolStyle: 'জগন্নাথ ধামের আদলে তৈরি দুর্গাপ্রতিমা',
    mapsQuery: 'Kakdwip Amritayan Sangha Kakdwip',
    transit: {
      metro: { name: 'প্রযোজ্য নয় (নিকটতম: কবি সুভাষ গড়িয়া)', distance: '৮৫ কিমি', detail: 'শিয়ালদহ দক্ষিণ শাখা থেকে কাকদ্বীপ লোকাল ট্রেন ব্যবহার করুন।' },
      road: { name: 'কাকদ্বীপ বাস স্ট্যান্ড / ডি.এইচ. রোড', distance: '৮০০ মিটার', detail: 'ধর্মতলা / আমতলা / ডায়মন্ড হারবার থেকে সরাসরি বাস।' },
      train: { name: 'কাকদ্বীপ রেলওয়ে স্টেশন (শিয়ালদহ দক্ষিণ)', distance: '১.২ কিমি', detail: 'শিয়ালদহ থেকে সরাসরি ট্রেন। স্টেশন থেকে ১০ মিনিটে টোটো পাবেন।' }
    },
    bestOption: 'ট্রেন',
    crowdLevel: 'অত্যধিক ভিড়',
    bestTime: 'বিকেল ৪:০০ - রাত ৯:০০',
    highlights: ['কাকদ্বীপের প্রধান আকর্ষণ', 'পরিবেশ সচেতনতার বার্তা', 'জগন্নাথ মন্দির মণ্ডপ']
  },
  {
    id: 'kakdwip-2',
    name: 'কাকদ্বীপ নেতাজী সংঘ',
    category: 'কাকদ্বীপ',
    location: 'স্টেশন রোড / সিনেমা হল মোড়',
    address: 'নেতাজী সংঘ ক্লাব প্রাঙ্গণ, স্টেশন রোড, কাকদ্বীপ',
    theme2026: 'গ্রামীণ বাংলার লোক শিল্প ও কুটির শিল্প',
    themeDescription: 'হাতে বোনা পাট, মাটির পোড়ানো ফলক এবং ডোকরা শিল্পের মাধ্যমে গ্রামবাংলার ঐতিহ্যবাহী রূপ ফুটিয়ে তোলা হচ্ছে।',
    idolStyle: 'ঐতিহ্যবাহী টেরাকোটা প্রতিমা',
    mapsQuery: 'Kakdwip Railway Station Kakdwip',
    transit: {
      metro: { name: 'প্রযোজ্য নয়', distance: 'এন/এ', detail: 'ট্রেন বা বাস রুট ব্যবহার করুন।' },
      road: { name: 'কাকদ্বীপ সিনেমা হল মোড়', distance: '২০০ মিটার', detail: 'প্রধান রাস্তার পাশেই অবস্থিত।' },
      train: { name: 'কাকদ্বীপ রেলওয়ে স্টেশন', distance: '৪০০ মিটার', detail: 'স্টেশন থেকে মাত্র ৫ মিনিটের হাঁটা পথ।' }
    },
    bestOption: 'ট্রেন',
    crowdLevel: 'প্রচুর ভিড়',
    bestTime: 'বিকেল ৫:০০ - রাত ১০:০০',
    highlights: ['স্টেশনের খুব কাছে', 'লোকশিল্পের থিম', 'সাংস্কৃতিক অনুষ্ঠান']
  },
  {
    id: 'kakdwip-3',
    name: 'কাকদ্বীপ সুপার মার্কেট সার্বজনীন',
    category: 'কাকদ্বীপ',
    location: 'কাকদ্বীপ সুপার মার্কেট কমপ্লেক্স',
    address: 'সুপার মার্কেট গ্রাউন্ড, ডায়মন্ড হারবার রোড ক্রসিং, কাকদ্বীপ',
    theme2026: 'কোণার্ক সূর্য মন্দির - বাঁশ ও সোনার ধানের শিষের কারুকাজ',
    themeDescription: 'কোণার্কের বিখ্যাত সূর্য মন্দিরের আদলে তৈরি। সুক্ষ্মভাবে বোনা বাঁশের ছাল ও ধানের শিষ দিয়ে মণ্ডপটি সাজিয়েছেন দক্ষিণ ২৪ পরগনার শিল্পীরা।',
    idolStyle: 'ধানের শিষ ও মাটির ফিউশন প্রতিমা',
    mapsQuery: 'Kakdwip Super Market Kakdwip',
    transit: {
      metro: { name: 'প্রযোজ্য নয়', distance: 'এন/এ', detail: 'শিয়ালদহ দক্ষিণ ট্রেন / বাস।' },
      road: { name: 'কাকদ্বীপ প্রধান বাস স্ট্যান্ড', distance: '১০০ মিটার', detail: 'বাস টার্মিনাসের পাশেই অবস্থিত।' },
      train: { name: 'কাকদ্বীপ রেলওয়ে স্টেশন', distance: '১.৫ কিমি', detail: 'স্টেশন থেকে ৫ মিনিটের টোটো রাইড।' }
    },
    bestOption: 'রাস্তা (বাস/অটো)',
    crowdLevel: 'অত্যধিক ভিড়',
    bestTime: 'সন্ধ্যা ৬:০০ - রাত ১১:০০',
    highlights: ['শহরের প্রাণকেন্দ্রে অবস্থিত', 'খাবারের হরেক স্টল', 'সহজ বাস যোগাযোগ']
  },
  {
    id: 'kakdwip-4',
    name: 'কাকদ্বীপ রথতলা যুবক সংঘ',
    category: 'কাকদ্বীপ',
    location: 'রথতলা রোড',
    address: 'রথতলা রোড, শ্মশান কালী মন্দিরের কাছে, কাকদ্বীপ',
    theme2026: 'পুরুলিয়ার ছৌ নাচ ও কাঠের মুখোস শিল্প',
    themeDescription: 'কাঠের তৈরি পুতুল, উজ্জ্বল রঙের ছৌ নাচের মুখোস এবং পুরুলিয়ার নিজস্ব বাদ্যযন্ত্রের সংমিশ্রণে পরিবেশন।',
    idolStyle: 'ছৌ নাচের মুখোশ শৈলীর দেবী প্রতিমা',
    mapsQuery: 'Rathtala Road Kakdwip',
    transit: {
      metro: { name: 'প্রযোজ্য নয়', distance: 'এন/এ', detail: 'শিয়ালদহ কাকদ্বীপ লোকাল নিন।' },
      road: { name: 'হাসপাতাল মোড় কাকদ্বীপ', distance: '৪০০ মিটার', detail: 'হাসপাতাল মোড় থেকে অটো বা টোটো পাবেন।' },
      train: { name: 'কাকদ্বীপ রেলওয়ে স্টেশন', distance: '২.০ কিমি', detail: 'স্টেশন থেকে সরাসরি টোটো রথতলা যাবে।' }
    },
    bestOption: 'ট্রেন',
    crowdLevel: 'সাধারণ ভিড়',
    bestTime: 'বিকেল ৩:০০ - সন্ধ্যা ৭:০০',
    highlights: ['ছৌ মুখোশ শিল্প', 'সাংস্কৃতিক সন্ধ্যা', 'সুন্দর মণ্ডপ সজ্জা']
  },
  {
    id: 'kakdwip-5',
    name: 'কাকদ্বীপ সুভাষনগর সার্বজনীন',
    category: 'কাকদ্বীপ',
    location: 'সুভাষনগর ময়দান',
    address: 'সুভাষনগর হাইস্কুল মাঠের কাছে, কাকদ্বীপ',
    theme2026: 'বিষ্ণুপুরের টেরাকোটা মন্দির',
    themeDescription: 'বিষ্ণুপুরের ঐতিহ্যবাহী রাসমঞ্চ ও জোরবাংলা মন্দিরের আদলে তৈরি। শত শত পোড়ামাটির ফলক দিয়ে গঠিত।',
    idolStyle: 'বিষ্ণুপুরী টেরাকোটা মাটির কাজ',
    mapsQuery: 'Kakdwip High School Kakdwip',
    transit: {
      metro: { name: 'প্রযোজ্য নয়', distance: 'এন/এ', detail: 'দক্ষিণ ২৪ পরগনা ট্রেন।' },
      road: { name: 'সুভাষনগর অটো স্ট্যান্ড', distance: '২০০ মিটার', detail: 'কাকদ্বীপ বাস স্ট্যান্ড থেকে সরাসরি টোটো।' },
      train: { name: 'কাকদ্বীপ রেলওয়ে স্টেশন', distance: '১.০ কিমি', detail: '৭ মিনিটের টোটো সফর।' }
    },
    bestOption: 'ট্রেন',
    crowdLevel: 'সাধারণ ভিড়',
    bestTime: 'বিকেল ৫:০০ - রাত ৯:০০',
    highlights: ['টেরাকোটা শিল্প', 'স্কুল মাঠের পুজো', 'পরিবার নিয়ে দেখার মতো']
  },

  // --- BONEDI BARIR PUJO ---
  {
    id: 'bonedi-1',
    name: 'শোভাবাজার রাজবাড়ি (বড় তরফ)',
    category: 'বনেদি বাড়ির পুজো',
    location: 'শোভাবাজার, উত্তর কলকাতা',
    address: '৩৬, রাজা নবকৃষ্ণ স্ট্রিট, শোভাবাজার, কলকাতা - ৭০০০০৫',
    theme2026: '২৬৯ বছরের ঐতিহ্য (প্রতিষ্ঠা ১৭৫৭) - খাঁটি সাবেকি সংস্কৃতি',
    themeDescription: 'এখানে কোনো থিম থাকে না। ঐতিহ্যবাহী ঠাকুর দালানে দেবী প্রতিমা তৈরি হয় রথযাত্রার দিন থেকে। নীলকণ্ঠ পাখি উড়ানোর প্রতীকী রীতি ও কাঁধে করে বিসর্জন অত্যন্ত বিখ্যাত।',
    idolStyle: 'রুপোর মুকুট ও সাবেকি একচালা ডাকের সাজ',
    mapsQuery: 'Shobhabazar Rajbari Kolkata',
    transit: {
      metro: { name: 'শোভাবাজার শুটানুটি মেট্রো', distance: '৩৫০ মিটার', detail: 'রাজা নবকৃষ্ণ স্ট্রিট ধরে মাত্র ৫ মিনিটের হাঁটা পথ।' },
      road: { name: 'বি.কে. পাল এভিনিউ / রবীন্দ্র সরণি', distance: '২৫০ মিটার', detail: 'শোভাবাজার মোড়ের বাস।' },
      train: { name: 'শোভাবাজার আহিরীটোলা সার্কুলার স্টেন', distance: '৮০০ মিটার', detail: 'গঙ্গার ঘাট থেকে সহজে হেঁটে যাওয়া যায়।' }
    },
    bestOption: 'মেট্রো',
    crowdLevel: 'অত্যধিক ভিড়',
    bestTime: 'সকাল ১০:০০ - দুপুর ১:০০ (ঠাকুর দালানের দৃশ্য দেখতে)',
    highlights: ['১৭৫৭ সালের পুজো (পলাশীর যুদ্ধের পর)', 'বিশাল নাটমন্দির ও ঠাকুর দালান', 'সন্ধিপূজায় কামান দাগা']
  },
  {
    id: 'bonedi-2',
    name: 'সাবর্ণ রায় চৌধুরী বাড়ির পুজো',
    category: 'বনেদি বাড়ির পুজো',
    location: 'বড়িশা, দক্ষিণ কলকাতা',
    address: 'সাবর্ণ কুল প্রতিষ্ঠান, সখের বাজার, ডায়মন্ড হারবার রোড, বড়িশা, কলকাতা',
    theme2026: 'কলকাতার প্রাচীনতম বনেদি পুজো (প্রতিষ্ঠা ১৬১০)',
    themeDescription: '৪১৬ বছরেরও বেশি পুরনো ইতিহাস! যে জমিদার পরিবার ইংরেজদের কলকাতা লিজ দিয়েছিল। আটটি আলাদা পরিবারে পুজো হয়। তপ্ত কাঞ্চন বর্ণা দুর্গাপ্রতিমা এখানকার অন্যতম আকর্ষণ।',
    idolStyle: 'প্রাচীন তপ্ত কাঞ্চন বর্ণা সাবেকি প্রতিমা',
    mapsQuery: 'Sabarna Roy Choudhury Barir Puja Barisha Kolkata',
    transit: {
      metro: { name: 'তারাতলা / বেহালা চৌরাস্তা মেট্রো', distance: '১.৫ কিমি', detail: 'বেহালা চৌরাস্তা মেট্রো থেকে ৫ মিনিটের অটো।' },
      road: { name: 'সখের বাজার বাস স্টপ', distance: '২০০ মিটার', detail: 'ডি.এইচ. রোডের সমস্ত বাস।' },
      train: { name: 'মাজেরইাট জংশন', distance: '৪.৫ কিমি', detail: 'ডি.এইচ. রোডের বাস বা অটো নিন।' }
    },
    bestOption: 'রাস্তা (বাস/অটো)',
    crowdLevel: 'প্রচুর ভিড়',
    bestTime: 'সকাল ১১:০০ - দুপুর ৩:০০',
    highlights: ['১৬১০ সালের ইতিহাস (৪০০+ বছর)', 'ঐতিহাসিক জমিদারি প্রথা', 'খাঁটি শাস্ত্রীয় নিয়ম']
  },
  {
    id: 'bonedi-3',
    name: 'পাথুরিয়াঘাটা ঘোষ বাড়ি',
    category: 'বনেদি বাড়ির পুজো',
    location: 'পাথুরিয়াঘাটা, উত্তর কলকাতা',
    address: '৪৬, পাথুরিয়াঘাটা স্ট্রিট, মেলাপাড়ার কাছে, কলকাতা',
    theme2026: '১৭০+ বছরের মার্বেল প্রাসাদের পুজো ও রাজকীয় ভোগ',
    themeDescription: 'ভিক্টোরিয়ান পিলার ও মার্বেলের সুবিশাল ঠাকুর দালানে এই পুজো অনুষ্ঠিত হয়। মায়ের নির্ভেজাল নিরামিষ ভোগ এবং ঢাকের বোল প্রাচীন ঐতিহ্যের পরিচয় দেয়।',
    idolStyle: 'সোনার মুকুট পরিহিত রাজকীয় একচালা',
    mapsQuery: 'Pathuriaghata Ghosh Bari Kolkata',
    transit: {
      metro: { name: 'গিরিশ পার্ক / শোভাবাজার মেট্রো', distance: '৬০০ মিটার', detail: 'চিত্তরঞ্জন এভিনিউ থেকে পাথুরিয়াঘাটা স্ট্রিটে প্রবেশ করুন।' },
      road: { name: 'রবীন্দ্র সরণি / বি.কে. পাল', distance: '৩০০ মিটার', detail: 'মধ্য কলকাতার বাস সার্ভিস।' },
      train: { name: 'বড়বাজার রেলওয়ে স্টেশন', distance: '১.০ কিমি', detail: 'অটো বা হাঁটা পথ।' }
    },
    bestOption: 'মেট্রো',
    crowdLevel: 'সাধারণ ভিড়',
    bestTime: 'সকাল ১০:০০ - দুপুর ২:০০',
    highlights: ['ভিক্টোরিয়ান রাজপ্রাসাদ', 'মার্বেল পাথর বাঁধানো উঠোন', 'সুস্বাদু রাজকীয় ভোগ']
  },
  {
    id: 'bonedi-4',
    name: 'জোড়াসাঁকো দাঁ বাড়ি',
    category: 'বনেদি বাড়ির পুজো',
    location: 'জোড়াসাঁকো, উত্তর কলকাতা',
    address: '১২, শিব কৃষ্ণ দাঁ লেন, জোড়াসাঁকো, কলকাতা',
    theme2026: 'বণিক রাজাদের পুজো - সোনা ও রুপোর অলঙ্কারে সজ্জিত দেবী',
    themeDescription: '১৮৪০ সালে গোকুল চন্দ্র দাঁ এই পুজো শুরু করেন। দেবী প্রতিমাকে সম্পূর্ণ খাঁটি সোনা ও রুপোর গয়নায় সাজানো হয়। প্রাচীন প্রবেশদ্বার ও উঁচু খিলান দর্শকদের মন্ত্রমুগ্ধ করে।',
    idolStyle: 'সোনা ও রুপোর গয়নায় মোড়া একচালা',
    mapsQuery: 'Jorasanko Daw Bari Kolkata',
    transit: {
      metro: { name: 'গিরিশ পার্ক মেট্রো স্টেশন', distance: '৪০০ মিটার', detail: '২ নং গেট দিয়ে বেরিয়ে বিবেকানন্দ রোড হয়ে ৫ মিনিট হেঁটে যান।' },
      road: { name: 'গিরিশ পার্ক ক্রসিং', distance: '৩৫০ মিটার', detail: 'সেন্ট্রাল এভিনিউয়ের সমস্ত বাস থামে।' },
      train: { name: 'শিয়ালদহ স্টেশন', distance: '২.২ কিমি', detail: 'গিরিশ পার্কের অটো ধরুন।' }
    },
    bestOption: 'মেট্রো',
    crowdLevel: 'প্রচুর ভিড়',
    bestTime: 'সকাল ১১:০০ - বিকেল ৪:০০',
    highlights: ['খাঁটি সোনা ও রুপোর গয়না', 'বিখ্যাত সিনেমা শুটিং স্থান', 'শান্ত পরিবেশ']
  }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('সব');
  const [searchQuery, setSearchQuery] = useState('');
  const [transitFilter, setTransitFilter] = useState('সব');
  const [activeModalPandal, setActiveModalPandal] = useState(null);
  const [hoppingList, setHoppingList] = useState([]);
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pandals');

  const categories = ['সব', 'উত্তর কলকাতা', 'দক্ষিণ কলকাতা', 'কাকদ্বীপ', 'বনেদি বাড়ির পুজো'];

  // Toggle saved pandal
  const toggleHoppingList = (pandal, e) => {
    e.stopPropagation();
    if (hoppingList.some(item => item.id === pandal.id)) {
      setHoppingList(hoppingList.filter(item => item.id !== pandal.id));
    } else {
      setHoppingList([...hoppingList, pandal]);
    }
  };

  // Filtered pujas logic
  const filteredPujas = useMemo(() => {
    return PUJA_DATA.filter(puja => {
      const matchesCategory = selectedCategory === 'সব' || puja.category === selectedCategory;
      
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        puja.name.toLowerCase().includes(query) ||
        puja.location.toLowerCase().includes(query) ||
        puja.theme2026.toLowerCase().includes(query) ||
        puja.address.toLowerCase().includes(query);

      const matchesTransit = 
        transitFilter === 'সব' || 
        puja.bestOption.toLowerCase() === transitFilter.toLowerCase();

      return matchesCategory && matchesSearch && matchesTransit;
    });
  }, [selectedCategory, searchQuery, transitFilter]);

  // Maps Link for full circuit
  const getCombinedMapsUrl = () => {
    if (hoppingList.length === 0) return '#';
    const destinations = hoppingList.map(p => encodeURIComponent(p.mapsQuery)).join('/');
    return `https://www.google.com/maps/dir/${destinations}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16 selection:bg-amber-500 selection:text-slate-950">
      
      {/* App Header Header */}
      <header className="relative bg-gradient-to-r from-red-950 via-rose-900 to-amber-950 border-b border-amber-500/30 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center space-x-2 text-amber-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-1">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>মহা দুর্গোৎসব ২০২৬ • লাইভ মণ্ডপ পরিক্রমা ও রুট গাইড</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-amber-100 drop-shadow-md">
                দুর্গা পূজা <span className="text-amber-400 font-serif">গাইড ও নেভিগেশন</span>
              </h1>
              <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                উত্তর কলকাতা, দক্ষিণ কলকাতা, কাকদ্বীপ ও বনেদি বাড়ির ২০২৬ সালের পুজো থিম, সঠিক গুগল ম্যাপ ডিরেকশন এবং যাতায়াতের সঠিক পথ (<span className="text-amber-300 font-medium">মেট্রো, ট্রেন বা অটো/বাস</span>) জানুন।
              </p>
            </div>

            {/* Hopping Plan Trigger Button */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsItineraryOpen(true)}
                className="relative bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-lg transition-all transform active:scale-95 flex items-center space-x-2 border border-amber-300"
              >
                <Compass className="w-5 h-5" />
                <span>আমার পারিক্রমা রুট</span>
                {hoppingList.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white font-extrabold text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-md">
                    {hoppingList.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Navigation View Tabs */}
          <div className="mt-8 flex border-b border-amber-500/20 space-x-6">
            <button
              onClick={() => setActiveTab('pandals')}
              className={`pb-3 font-semibold text-sm sm:text-base flex items-center space-x-2 transition-colors border-b-2 ${
                activeTab === 'pandals'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>মণ্ডপ তালিকা</span>
            </button>
            <button
              onClick={() => setActiveTab('transit_guide')}
              className={`pb-3 font-semibold text-sm sm:text-base flex items-center space-x-2 transition-colors border-b-2 ${
                activeTab === 'transit_guide'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Subway className="w-4 h-4" />
              <span>মেট্রো ও ট্রেন নির্দেশিকা</span>
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`pb-3 font-semibold text-sm sm:text-base flex items-center space-x-2 transition-colors border-b-2 ${
                activeTab === 'tips'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>জরুরি নম্বর ও সহায়তা</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'pandals' && (
          <>
            <div className="space-y-6 mb-10">
              
              {/* Category Chips */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-xs uppercase tracking-wider text-amber-400/80 font-bold mr-2 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> বিভাগ বেছে নিন:
                </span>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      selectedCategory === cat
                        ? 'bg-gradient-to-r from-red-700 to-rose-700 text-white shadow-lg shadow-rose-900/40 border border-rose-500/50'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {cat === 'সব' ? '🌟 সমস্ত মণ্ডপ ও পুজো' : cat}
                  </button>
                ))}
              </div>

              {/* Search Bar & Transit Mode Select */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shadow-xl backdrop-blur">
                
                {/* Search Input */}
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="খুঁজুন (যেমন: বাগবাজার, জগন্নাথ, একচালা, কাকদ্বীপ)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 text-slate-100 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm transition-all"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Transit Filter */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400 font-medium whitespace-nowrap">যাতায়াত মাধ্যম:</span>
                  <select
                    value={transitFilter}
                    onChange={(e) => setTransitFilter(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 py-2.5 px-3 rounded-xl border border-slate-800 text-sm focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="সব">সব মাধ্যম (মেট্রো/বাস/ট্রেন)</option>
                    <option value="মেট্রো">🚆 মেট্রো সুবিধাজনক</option>
                    <option value="ট্রেন">🚈 লোকাল ট্রেন সুবিধাজনক</option>
                    <option value="রাস্তা (বাস/অটো)">🚌 বাস/অটো সুবিধাজনক</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex justify-between items-center mb-6 text-xs sm:text-sm text-slate-400">
              <p>
                মোট <span className="font-bold text-amber-400">{filteredPujas.length} টি</span> প্রধান পুজো পাওয়া গিয়েছে
                {selectedCategory !== 'সব' && <span> (<span className="text-slate-200">{selectedCategory}</span>)</span>}
              </p>
              {hoppingList.length > 0 && (
                <p className="text-amber-300">
                  {hoppingList.length} টি মণ্ডপ রুট প্ল্যানারে সংরক্ষিত
                </p>
              )}
            </div>

            {filteredPujas.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800 p-8">
                <Compass className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-300">কোন মণ্ডপ খুঁজে পাওয়া যায়নি</h3>
                <p className="text-slate-500 text-sm mt-1">অনুগ্রহ করে আবার অন্য নাম লিখে খুঁজুন অথবা ফিল্টার রিকসেট করুন।</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('সব'); setTransitFilter('সব'); }}
                  className="mt-4 px-4 py-2 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-xl hover:bg-amber-500/30 transition-all border border-amber-500/30"
                >
                  সমস্ত ফিল্টার রিসেট করুন
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPujas.map((pandal) => {
                  const isSaved = hoppingList.some(item => item.id === pandal.id);

                  return (
                    <div
                      key={pandal.id}
                      onClick={() => setActiveModalPandal(pandal)}
                      className="group bg-slate-900 rounded-2xl border border-slate-800 hover:border-amber-500/50 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-1"
                    >
                      <div>
                        {/* Card Top */}
                        <div className="p-5 pb-3 border-b border-slate-800/80 bg-gradient-to-b from-slate-800/40 to-transparent">
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <span className="px-2.5 py-1 rounded-full bg-slate-800 text-amber-300 text-[11px] font-bold tracking-wide border border-amber-500/20">
                              {pandal.category}
                            </span>

                            <button
                              onClick={(e) => toggleHoppingList(pandal, e)}
                              className={`p-2 rounded-xl transition-all ${
                                isSaved
                                  ? 'bg-amber-500 text-slate-950 shadow-md'
                                  : 'bg-slate-800/80 text-slate-400 hover:text-amber-400 hover:bg-slate-800'
                              }`}
                              title={isSaved ? "রুট থেকে সরান" : "রুটে যোগ করুন"}
                            >
                              <Bookmark className="w-4 h-4 fill-current" />
                            </button>
                          </div>

                          <h3 className="text-xl font-black text-slate-100 group-hover:text-amber-300 transition-colors leading-snug">
                            {pandal.name}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                            <span className="truncate">{pandal.location}</span>
                          </p>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 space-y-4">
                          
                          {/* Theme Highlight */}
                          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                            <div className="flex items-center space-x-1.5 text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>২০২৬ সালের থিম</span>
                            </div>
                            <p className="text-sm font-semibold text-rose-200 line-clamp-2 leading-relaxed">
                              {pandal.theme2026}
                            </p>
                          </div>

                          {/* Transit Preview */}
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center justify-between text-slate-400 font-medium">
                              <span>যাতায়াতের সেরা পথ:</span>
                              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[11px] border border-amber-500/30">
                                ⭐ {pandal.bestOption}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 gap-1.5 bg-slate-950/40 p-2.5 rounded-xl text-slate-300 border border-slate-800/50">
                              <div className="flex items-center gap-2">
                                <Subway className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                <span className="truncate font-medium text-slate-300">{pandal.transit.metro.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Bus className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span className="truncate text-slate-400">{pandal.transit.road.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Train className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                <span className="truncate text-slate-400">{pandal.transit.train.name}</span>
                              </div>
                            </div>
                          </div>

                          {/* Best Time & Crowd Status */}
                          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/60">
                            <span className="text-slate-400 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-500" />
                              {pandal.bestTime}
                            </span>
                            <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                              pandal.crowdLevel === 'চরম ভিড়' ? 'bg-red-950 text-red-400 border border-red-800' :
                              pandal.crowdLevel === 'অত্যধিক ভিড়' ? 'bg-orange-950 text-orange-400 border border-orange-800' :
                              'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            }`}>
                              {pandal.crowdLevel}
                            </span>
                          </div>

                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="p-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModalPandal(pandal);
                          }}
                          className="text-xs font-bold text-slate-300 hover:text-amber-300 flex items-center gap-1 transition-colors"
                        >
                          বিস্তারিত দেখুন <ChevronRight className="w-3.5 h-3.5" />
                        </button>

                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(pandal.mapsQuery)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 shadow-md"
                        >
                          <Navigation className="w-3.5 h-3.5 fill-current" />
                          <span>গুগল ম্যাপ দিকনির্দেশ</span>
                        </a>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Transit Guide Tab */}
        {activeTab === 'transit_guide' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center space-x-3 text-amber-400">
                <Subway className="w-8 h-8" />
                <div>
                  <h2 className="text-2xl font-black text-slate-100">কলকাতা ও দক্ষিণ ২৪ পরগনা যাতায়াত নির্দেশিকা</h2>
                  <p className="text-sm text-slate-400">উত্তর, দক্ষিণ, বনেদি বাড়ি ও কাকদ্বীপের পুজোর মণ্ডপে সহজে পৌঁছানোর নিয়মাবলী</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                
                {/* Metro */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center space-x-2 text-blue-400 font-bold">
                    <Subway className="w-5 h-5" />
                    <span>১. কলকাতা মেট্রো পরিষেবা</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>২৪ ঘণ্টা নাইট সার্ভিস:</strong> সপ্তমী, অষ্টমী ও নবমীর রাতে ব্লু লাইনে সারা রাত ১২-১৫ মিনিট অন্তর বিশেষ মেট্রো চলাচল করে।
                  </p>
                  <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                    <li><strong>উত্তর কলকাতা:</strong> শোভাবাজার শুটানুটি, শ্যামবাজার, গিরিশ পার্ক।</li>
                    <li><strong>দক্ষিণ কলকাতা:</strong> কালীঘাট, রবীন্দ্র সরোবর, জতিন দাস পার্ক।</li>
                    <li><strong>বনেদি বাড়ি:</strong> গিরিশ পার্ক ও শোভাবাজার।</li>
                  </ul>
                </div>

                {/* Suburban Trains */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold">
                    <Train className="w-5 h-5" />
                    <span>২. কাকদ্বীপ ও লোকাল ট্রেন</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>শিয়ালদহ দক্ষিণ শাখা:</strong> শিয়ালদহ থেকে সরাসরি কাকদ্বীপ লোকাল পাওয়া যায় (আনুমানিক ২ ঘন্টা ১৫ মিনিট)।
                  </p>
                  <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                    <li><strong>পূজা স্পেশাল ট্রেন:</strong> পুজোর রাতে অতিরিক্ত কাকদ্বীপ লোকাল চলে।</li>
                    <li><strong>কাকদ্বীপ টোটো:</strong> কাকদ্বীপ স্টেশন থেকে মণ্ডপগুলির জন্য টোটো ও অটো উপলব্ধ।</li>
                  </ul>
                </div>

                {/* Road */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                    <Bus className="w-5 h-5" />
                    <span>৩. বাস ও অটো রুট</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>নো-এন্ট্রি ও পদব্রজে চলাচলের নিয়ম:</strong> কলকাতা পুলিশ বিকেল ৪টার পর বহু রাস্তায় গাড়ি চলাচল বন্ধ করে দর্শনার্থীদের হাঁটার পথ করে দেয়।
                  </p>
                  <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                    <li><strong>কাকদ্বীপ রুট:</strong> ডায়মন্ড হারবার রোড (NH 117) দিয়ে ধর্মতলা ও আমতলা থেকে সরাসরি বাস চলে।</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Quick Reference Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 overflow-x-auto">
              <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" /> অঞ্চলভিত্তিক দ্রুত যাতায়াত পরামর্শ
              </h3>
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-3">অঞ্চল</th>
                    <th className="p-3">সেরা মাধ্যম</th>
                    <th className="p-3">প্রধান গেটওয়ে</th>
                    <th className="p-3">টিপস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr>
                    <td className="p-3 font-bold text-amber-300">উত্তর কলকাতা</td>
                    <td className="p-3"><span className="text-blue-400 font-medium">মেট্রো / পায়ে হাঁটা</span></td>
                    <td className="p-3">শ্যামবাজার / শোভাবাজার মেট্রো</td>
                    <td className="p-3 text-slate-400">বেলগাছিয়ায় গাড়ি পার্ক করে মেট্রো ব্যবহার করুন।</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-300">দক্ষিণ কলকাতা</td>
                    <td className="p-3"><span className="text-blue-400 font-medium">মেট্রো + শেয়ার অটো</span></td>
                    <td className="p-3">কালীঘাট / রবীন্দ্র সরোবর মেট্রো</td>
                    <td className="p-3 text-slate-400">রাসবিহারী এভিনিউতে ব্যারিকেড থাকে, হেঁটে যাওয়া দ্রুততর।</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-300">কাকদ্বীপের পুজো</td>
                    <td className="p-3"><span className="text-amber-400 font-medium">লোকাল ট্রেন / টোটো</span></td>
                    <td className="p-3">কাকদ্বীপ রেলওয়ে স্টেশন / বাস স্ট্যান্ড</td>
                    <td className="p-3 text-slate-400">লোকাল টোটো বুক করে পুরো কাকদ্বীপের পুজো ৩ ঘণ্টায় ঘুরুন।</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-300">বনেদি বাড়ির পুজো</td>
                    <td className="p-3"><span className="text-emerald-400 font-medium">দিনের মেট্রো / ট্যাক্সি</span></td>
                    <td className="p-3">গিরিশ পার্ক / শোভাবাজার</td>
                    <td className="p-3 text-slate-400">সকাল ১০টা থেকে দুপুর ৩টের মধ্যে ঘুরে নিন।</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Safety Tips Tab */}
        {activeTab === 'tips' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center space-x-3 text-rose-500">
                <ShieldAlert className="w-8 h-8" />
                <div>
                  <h2 className="text-2xl font-black text-slate-100">জরুরি সেবার ফোন নম্বর ও টিপস</h2>
                  <p className="text-sm text-slate-400">দুর্গাপূজার সময় যেকোনো দরকারে সহায়ক হেল্পলাইন</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">কলকাতা পুলিশ এমার্জেন্সি</p>
                    <p className="text-xl font-black text-amber-400">১০০ / ১০৯০</p>
                  </div>
                  <span className="p-3 bg-rose-950 text-rose-400 rounded-xl border border-rose-800/50">🚨</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">স্বাস্থ্য ও অ্যাম্বুলেন্স হেল্পলাইন</p>
                    <p className="text-xl font-black text-emerald-400">১০২ / ১০৪</p>
                  </div>
                  <span className="p-3 bg-emerald-950 text-emerald-400 rounded-xl border border-emerald-800/50">🚑</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">দক্ষিণ ২৪ পরগনা জেলা কন্ট্রোল রুম</p>
                    <p className="text-xl font-black text-blue-400">০৩৩ ২৪৭৯ ১০১০</p>
                  </div>
                  <span className="p-3 bg-blue-950 text-blue-400 rounded-xl border border-blue-800/50">🏛️</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">কাকদ্বীপ মহকুমা কন্ট্রোল রুম</p>
                    <p className="text-xl font-black text-amber-400">০৩২১০ ২৫৫ ২২১</p>
                  </div>
                  <span className="p-3 bg-amber-950 text-amber-400 rounded-xl border border-amber-800/50">📞</span>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 space-y-3">
                <h4 className="text-amber-300 font-bold flex items-center gap-2">
                  <Info className="w-5 h-5" /> মণ্ডপ পরিক্রমার কিছু গুরুত্বপূর্ণ টিপস:
                </h4>
                <ul className="text-xs sm:text-sm text-slate-300 space-y-2 list-disc pl-5">
                  <li><strong>শিশু ও প্রবীণদের সুরক্ষা:</strong> শিশুদের পকেটে বা আইডি কার্ডে নাম ও ফোন নম্বর লিখে রাখুন।</li>
                  <li><strong>পানীয় জল ও জুতো:</strong> পুজো পরিক্রমায় প্রচুর হাঁটতে হয়, তাই আরামদায়ক জুতো পরুন ও জলের বোতল সাথে রাখুন।</li>
                  <li><strong>বনেদি বাড়ির নিয়ম:</strong> বনেদি বাড়ির পুজোর দালানে প্রবেশ ও ছবি তোলার সময় পরিবারের নিয়ম মেনে চলুন।</li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Modal View */}
      {activeModalPandal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-red-950 to-amber-950 border-b border-slate-800 relative">
              <button
                onClick={() => setActiveModalPandal(null)}
                className="absolute right-5 top-5 p-2 rounded-full bg-slate-900/80 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                {activeModalPandal.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-amber-100 mt-2 pr-8">
                {activeModalPandal.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{activeModalPandal.address}</span>
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-slate-200">
              
              {/* Theme Breakdown */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>২০২৬ সালের থিম ও ভাবনার বিস্তারিত</span>
                </div>
                <h4 className="text-lg font-bold text-rose-200">{activeModalPandal.theme2026}</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeModalPandal.themeDescription}
                </p>
                <div className="pt-2 text-xs text-amber-300/90 font-medium">
                  <strong>প্রতিমার শৈলী:</strong> {activeModalPandal.idolStyle}
                </div>
              </div>

              {/* Detailed Options */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-emerald-400" /> কীভাবে পৌঁছাবেন (মেট্রো, রাস্তা, ট্রেন)
                </h3>

                <div className="space-y-3 text-xs sm:text-sm">
                  
                  {/* Metro */}
                  <div className={`p-3.5 rounded-2xl border flex items-start space-x-3 ${
                    activeModalPandal.bestOption === 'মেট্রো' 
                      ? 'bg-blue-950/40 border-blue-500/50 text-blue-100' 
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}>
                    <Subway className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-slate-100">মেট্রো রেল:</strong>
                        <span className="text-xs text-blue-300">{activeModalPandal.transit.metro.name} ({activeModalPandal.transit.metro.distance})</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{activeModalPandal.transit.metro.detail}</p>
                    </div>
                  </div>

                  {/* Road */}
                  <div className={`p-3.5 rounded-2xl border flex items-start space-x-3 ${
                    activeModalPandal.bestOption === 'রাস্তা (বাস/অটো)' 
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100' 
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}>
                    <Bus className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-slate-100">রাস্তা (বাস/অটো/ট্যাক্সি):</strong>
                        <span className="text-xs text-emerald-300">{activeModalPandal.transit.road.name} ({activeModalPandal.transit.road.distance})</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{activeModalPandal.transit.road.detail}</p>
                    </div>
                  </div>

                  {/* Train */}
                  <div className={`p-3.5 rounded-2xl border flex items-start space-x-3 ${
                    activeModalPandal.bestOption === 'ট্রেন' 
                      ? 'bg-amber-950/40 border-amber-500/50 text-amber-100' 
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}>
                    <Train className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-slate-100">লোকাল ট্রেন:</strong>
                        <span className="text-xs text-amber-300">{activeModalPandal.transit.train.name} ({activeModalPandal.transit.train.distance})</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{activeModalPandal.transit.train.detail}</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Timing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">দর্শনের উপযুক্ত সময়:</span>
                  <span className="text-sm font-bold text-amber-300 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-amber-400" /> {activeModalPandal.bestTime}
                  </span>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">বিশেষ আকর্ষণ:</span>
                  <div className="flex flex-wrap gap-1">
                    {activeModalPandal.highlights.map(h => (
                      <span key={h} className="text-[10px] font-semibold bg-slate-800 text-slate-200 px-2 py-0.5 rounded">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={(e) => toggleHoppingList(activeModalPandal, e)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  hoppingList.some(item => item.id === activeModalPandal.id)
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                <Bookmark className="w-4 h-4 fill-current" />
                <span>
                  {hoppingList.some(item => item.id === activeModalPandal.id) ? 'সংরক্ষিত আছে' : 'রুটে যুক্ত করুন'}
                </span>
              </button>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeModalPandal.mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 shadow-lg"
              >
                <Navigation className="w-4 h-4 fill-current" />
                <span>গুগল ম্যাপ খুলুন</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* Drawer */}
      {isItineraryOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end">
          <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col justify-between p-6 shadow-2xl animate-in slide-in-from-right duration-300">
            
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2 text-amber-400">
                  <Compass className="w-6 h-6" />
                  <h3 className="text-xl font-extrabold text-slate-100">আমার পারিক্রমা রুট</h3>
                </div>
                <button
                  onClick={() => setIsItineraryOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                এখানে আপনার পছন্দের মণ্ডপগুলি বুকমার্ক করে একটি সম্পূর্ণ রাত্রিকালীন পরিক্রমা রুট তৈরি করুন!
              </p>

              {/* Hopping Items */}
              <div className="mt-6 space-y-3 max-h-[55vh] overflow-y-auto pr-1">
                {hoppingList.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-2xl p-4 text-slate-500 text-xs">
                    <Bookmark className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    এখনও কোন মণ্ডপ যুক্ত করা হয়নি। মণ্ডপ কার্ডের বুকমার্ক আইকনে ক্লিক করে আপনার রুট তৈরি করুন।
                  </div>
                ) : (
                  hoppingList.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-200 line-clamp-1">{item.name}</h4>
                          <span className="text-[11px] text-slate-400">{item.location} • {item.bestOption}</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => toggleHoppingList(item, e)}
                        className="text-slate-500 hover:text-red-400 p-1"
                        title="রুট থেকে বাদ দিন"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Launch Map Route */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              {hoppingList.length > 0 && (
                <a
                  href={getCombinedMapsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold py-3 rounded-xl text-center text-sm shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Navigation className="w-4 h-4 fill-current" />
                  <span>গুগল ম্যাপে পুরো রুটটি খুলুন</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <button
                onClick={() => setHoppingList([])}
                disabled={hoppingList.length === 0}
                className="w-full text-xs text-slate-500 hover:text-slate-300 font-semibold text-center disabled:opacity-40"
              >
                সমস্ত রুট পরিষ্কার করুন
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-slate-500 border-t border-slate-900 pt-8 max-w-7xl mx-auto px-4">
        <p>🎉 শুভ শারদীয়া ২০২৬ • কলকাতা ও দক্ষিণ ২৪ পরগনার মণ্ডপ পরিক্রমার নির্দেশিকা</p>
        <p className="mt-1 text-slate-600">মেট্রো রেল ও ট্রাফিক পুলিশের নির্দেশনার সাথে সমন্বিত।</p>
      </footer>

    </div>
  );
}