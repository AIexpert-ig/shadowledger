import React, { useState, useRef } from 'react'
import { useLedgerStore } from '../store/ledger'
import { FileService } from '../services/file'
import { LedgerEntry } from '../store/ledger'

export const TransactionForm = () => {
  // 1. State initialization
  const [type, setType] = useState<'COLLECT' | 'DEPOSIT'>('COLLECT')
  const [desc, setDesc] = useState('')
  // Initialize with empty string to avoid "0" appearing in the box
  const [amountStr, setAmountStr] = useState('') 
  
  const fileRef = useRef<HTMLInputElement>(null)
  const addTx = useLedgerStore(state => state.addTx)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Stop page reload
    
    const amtValue = parseFloat(amountStr)
    if (!desc || isNaN(amtValue) || amtValue <= 0) {
        alert('Please enter a valid description and amount')
        return
    }

    // Handle File
    let imgBase64: string | undefined
    const file = fileRef.current?.files?.[0]
    if (file) {
      if (file.size > 500_000) return alert('Image too large (Max 500KB)')
      imgBase64 = await FileService.toBase64(file)
    }

    const newTx: LedgerEntry = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString('en-CA'),
      type,
      desc,
      amount: amtValue,
      image: imgBase64
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
        
        {/* TYPE SELECT */}
        <div className="input-group">
          <label htmlFor="type">Type</label>
          <select 
            id="type" 
            value={type} 
            onChange={(e) => setType(e.target.value as any)}
          >
            <option value="COLLECT">📥 Collection (In)</option>
            <option value="DEPOSIT">📤 Deposit (Out)</option>
          </select>
        </div>

        {/* DESCRIPTION INPUT */}
        <div className="input-group">
          <label htmlFor="desc">Description</label>
          <input
            id="desc"
            type="text"
            value={desc}
            placeholder="Client Name or Reference"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        {/* AMOUNT INPUT (Fixed logic) */}
        <div className="input-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            // Use string state to strictly control the input
            value={amountStr}
            onChange={(e) => setAmountStr(e.target.value)}
          />
        </div>

        {/* FILE INPUT (Uncontrolled is standard for files) */}
        <div className="input-group">
          <label htmlFor="file">Receipt Image</label>
          <input 
            id="file" 
            ref={fileRef} 
            type="file" 
            accept="image/*" 
            // Note: File inputs should NOT have value={} or onChange={} for state
          />
        </div>

        <button type="submit" className="btn primary" style={{ width: '100%' }}>
          Save Entry
        </button>
      </form>
    </section>
  )
}