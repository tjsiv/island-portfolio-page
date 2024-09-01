import React, {useState, useRef} from 'react'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const formRef = useRef(null)
  const [form, setForm] = useState({name: '', email: '', message: ''})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) =>{
    setForm({...form, [e.target.name]: e.target.value})
  }
  const handleFocus = () =>{}
  const handleBlur = () =>{}

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: "Terrence",
        from_email: form.email,
        to_email: "tjsinquiry@gmail.com",
        message: form.message

      }, import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsLoading(false)
      setForm({name: '', email: '', message: ''})

    }).catch((error) =>{
      setIsLoading(false)
      console.error('Failed to send email: ', error);
      
    })
  }
  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      <div className='flex-1 min-w-[50%] flex flex-col '>
        <h1 className='head-text'>Get in Touch</h1>

        <form className='w-full flex flex-col gap-7 mt-14' onSubmit={handleSubmit}>
          <label className='text-black-500 font-semibold'>
            Name
            <input 
              className='input'
              name='name'
              type='text'
              placeholder='john'
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className='text-black-500 font-semibold'>
            Name
            <input 
              className='input'
              name='email'
              type='email'
              placeholder='john@gmail.com'
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className='text-black-500 font-semibold'>
            Name
            <textarea 
              className='textarea'
              name='message'
              rows={4}
              placeholder='How can I help?'
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button 
            className='btn'
            type="submit"
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}>
              {isLoading ? 'Sending...' : 'Send Message'}
            
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
