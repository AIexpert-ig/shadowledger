// src/components/TransactionForm.tsx
import { useState, useRef, useEffect } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import type { LedgerEntry } from '../store/ledger'
import { useLedgerStore } from '../store/ledger'
import { FileService } from '../services/file'

export const TransactionForm = () => {
  const [type, setType] = useState<'COLLECT' | 'DEPOSIT'>('COLLECT')
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState(0)
  const fileRef = useRef<HTMLInputElement>(null)
  const isMountedRef = useRef(true)

  const addTx = useLedgerStore(state => state.addTx)

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!desc || !amount) return alert('Please fill details')

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
      amount,
      image: imgBase64
    }

    addTx(newTx)

    // Reset form
    if (!isMountedRef.current) return
    setDesc('')
    setAmount(0)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <><section className="glass-card">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setType(e.target.value as 'COLLECT' | 'DEPOSIT')}
          >
            <option value="COLLECT">📥 Collection (In)</option>
            <option value="DEPOSIT">📤 Deposit (Out)</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="desc">Description</label>
          <input
            id="desc"
            type="text"
          value={desc}
          placeholder="Client Name or Reference"
          onChange={e => setDesc(e.target.value)} />
      </div><div className="input-group">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          value={amount === 0 ? '' : amount}
          step="0.01"
          placeholder="0.00"
          onChange={e => setAmount(parseFloat(e.target.value) || 0)} />
      </div><div className="input-group">
        <label htmlFor="file">Receipt Image</label>
        <input id="file" ref={fileRef} type="file" accept="image/*" />
      </div><button type="submit" className="btn primary" style={{ width: '100%' }}>
        Save Entry
      </button>
      </form>
      </section>
    </>
  );
}