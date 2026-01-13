import React, { useState, useRef } from 'react'
import { useLedgerStore } from '../store/ledger'
import { FileService } from '../services/file'
import { LedgerEntry } from '../store/ledger'

export const TransactionForm = () => {
  const [type, setType] = useState<'COLLECT' | 'DEPOSIT'>('COLLECT')
  const [desc, setDesc] = useState('')
  const [amountStr, setAmountStr] = useState('') 
  
  const fileRef = useRef<HTMLInputElement>(null)
  const addTx = useLedgerStore(state => state.addTx)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const amtValue = parseFloat(amountStr)
    if (!desc || isNaN(amtValue) || amtValue <= 0) {
        alert('Please enter a valid description and amount')
        return
    }

    // Handle File (PDF or Image)
    let fileBase64: string | undefined
    const file = fileRef.current?.files?.[0]
    
    if (file) {
      // LIMIT: 200KB limit to ensure LocalStorage doesn't break
      if (file.size > 200_000) {
        alert('File is too big! To ensure data saves, please use files under 200KB.')
        return
      }
      fileBase64 = await FileService.toBase64(file)
    }

    const newTx: LedgerEntry = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString('en-CA'),
      type,
      desc,
      amount: amtValue,
      image: fileBase64 // This can now be a PDF or Image string
    }

    addTx(newTx)

    // Reset Form
    setDesc('')
    setAmountStr('')
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <section className="glass-card">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="type">Type</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value as any)}>
            <option value="COLLECT">📥 Collection (In)</option>
            <option value="DEPOSIT">📤 Deposit (Out)</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="desc">Description</label>
          <input id="desc" type="text" value={desc} placeholder="Client Name" onChange={(e) => setDesc(e.target.value)} />
        </div>

        <div className="input-group">
          <label htmlFor="amount">Amount</label>
          <input 
            id="amount" 
            type="number" 
            step="0.01" 
            placeholder="0.00" 
            value={amountStr} 
            onChange={(e) => setAmountStr(e.target.value)} 
          />
        </div>

        <div className="input-group">
          <label htmlFor="file">Receipt (PDF or Image)</label>
          {/* FIX: Allow PDFs here */}
          <input 
            id="file" 
            ref={fileRef} 
            type="file" 
            accept="image/*,application/pdf" 
          />
        </div>

        <button type="submit" className="btn primary" style={{ width: '100%' }}>Save Entry</button>
      </form>
    </section>
  )
}