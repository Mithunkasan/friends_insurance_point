import React from 'react';
import { prisma } from '@/lib/prisma';
import { Mail, Phone, Calculator, Clock, CheckCircle, ShieldAlert, Award, FileSpreadsheet } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let enquiries: any[] = [];
  let quotes: any[] = [];
  let errorMsg: string | null = null;

  try {
    enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    quotes = await prisma.quoteRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error: any) {
    console.error('Database fetch error in admin panel:', error);
    errorMsg = 'Could not retrieve data. Please ensure PostgreSQL is running and migrations have been executed.';
  }

  const totalEnquiries = enquiries.length;
  const totalQuotes = quotes.length;
  const pendingQuotes = quotes.filter((q) => q.status === 'PENDING').length;
  const resolvedQuotes = quotes.filter((q) => q.status === 'RESOLVED').length;

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 bg-slate-50 min-h-screen">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-200 px-2.5 py-1 rounded-full">
            Security Mode: Developer Review
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
            Friends Insurance Point <span className="text-primary-blue">Admin</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-2 text-xs font-semibold text-rose-500 bg-rose-50 border border-rose-100 p-3 rounded-xl max-w-sm">
          <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
          <span>Notice: Authentication is currently in staging mode. Database tables are open for review.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-semibold">
          {errorMsg}
        </div>
      )}

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Enquiries</span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{totalEnquiries}</h3>
          </div>
          <div className="p-3 bg-blue-50 text-primary-blue rounded-xl">
            <Mail className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Quote Requests</span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{totalQuotes}</h3>
          </div>
          <div className="p-3 bg-green-50 text-primary-green rounded-xl">
            <Calculator className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Quotes</span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{pendingQuotes}</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Resolved Quotes</span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{resolvedQuotes}</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enquiries Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-primary-blue" />
              Recent Contact Enquiries
            </h3>
            <span className="text-xs font-bold text-slate-400">Showing {enquiries.length} item(s)</span>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {enquiries.length === 0 ? (
              <p className="text-xs text-slate-450 font-bold text-center py-12">No enquiries found in database</p>
            ) : (
              enquiries.map((enq) => (
                <div key={enq.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-slate-800 text-sm">{enq.name}</span>
                    <span className="text-slate-400 font-medium">
                      {new Date(enq.createdAt).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 font-semibold text-slate-550">
                    <a href={`tel:${enq.phone}`} className="flex items-center text-primary-blue">
                      <Phone className="w-3.5 h-3.5 mr-1" />
                      {enq.phone}
                    </a>
                    {enq.vehicleNumber && (
                      <span className="bg-slate-200 text-slate-650 px-2 py-0.5 rounded uppercase font-bold text-[10px]">
                        Vehicle: {enq.vehicleNumber}
                      </span>
                    )}
                    <span className="bg-primary-blue-light text-primary-blue px-2 py-0.5 rounded font-bold text-[10px]">
                      {enq.insuranceType}
                    </span>
                  </div>
                  {enq.message && (
                    <p className="bg-white p-3 rounded-lg border border-slate-100 text-slate-500 font-medium italic mt-2">
                      "{enq.message}"
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quotes Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary-green" />
              Recent Quote Requests
            </h3>
            <span className="text-xs font-bold text-slate-400">Showing {quotes.length} item(s)</span>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {quotes.length === 0 ? (
              <p className="text-xs text-slate-450 font-bold text-center py-12">No quote requests found in database</p>
            ) : (
              quotes.map((q) => (
                <div key={q.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-slate-800 text-sm">{q.name}</span>
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                      q.status === 'PENDING' ? 'bg-amber-100 text-amber-600' : 'bg-green-150 text-green-700'
                    }`}>
                      {q.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 font-semibold text-slate-550">
                    <a href={`tel:${q.phone}`} className="flex items-center text-primary-blue">
                      <Phone className="w-3.5 h-3.5 mr-1" />
                      {q.phone}
                    </a>
                    {q.email && <span>{q.email}</span>}
                    <span className="text-slate-400">
                      {new Date(q.createdAt).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-100 space-y-1.5 font-semibold text-slate-600">
                    <div className="grid grid-cols-2 gap-x-4">
                      <span>Vehicle Category: <strong className="text-slate-800">{q.vehicleType}</strong></span>
                      <span>Brand/Make: <strong className="text-slate-800">{q.vehicleMake}</strong></span>
                      <span>Model: <strong className="text-slate-800">{q.vehicleModel}</strong></span>
                      <span>Reg. Year: <strong className="text-slate-850">{q.registrationYear}</strong></span>
                    </div>
                    <div className="border-t border-slate-50 pt-1.5 mt-1.5 flex items-center justify-between text-[10px] font-bold">
                      <span className="text-primary-blue">Cover: {q.insuranceType}</span>
                      {q.previousPolicyExpiry && <span className="text-slate-400">Prev. Expiry: {q.previousPolicyExpiry}</span>}
                    </div>
                  </div>

                  {q.message && (
                    <p className="bg-white p-2.5 rounded-lg border border-slate-100 text-slate-550 font-medium italic mt-2">
                      "{q.message}"
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
