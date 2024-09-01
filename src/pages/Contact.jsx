import React, {useState, useRef, Suspense} from 'react'
import emailjs from '@emailjs/browser'
import { Canvas } from '@react-three/fiber'

import Loader from '../components/Loader'
import Fox from '../models/Fox'
import useAlert from '../hooks/useAlert'
import Alert from '../components/Alert'

const Contact = () => {
  const formRef = useRef(null)
  const [form, setForm] = useState({name: '', email: '', message: ''})
  const [isLoading, setIsLoading] = useState(false)
  const [currentAnimation, setcurrentAnimation] = useState('idle')
  const {alert, showAlert, hideAlert} = useAlert()

  const handleChange = (e) =>{
    setForm({...form, [e.target.name]: e.target.value})
  }
  const handleFocus = () =>setcurrentAnimation('walk')
  const handleBlur = () =>setcurrentAnimation('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setcurrentAnimation('hit')

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
      showAlert({
        show: true,
        message: 'Your message has been sent successfully!',
        type:'success'
        
      })
      
      setTimeout(() => {
        hideAlert()
        setcurrentAnimation('idle')
        setForm({name: '', email: '', message: ''})
      }, 3000)

    }).catch((error) =>{
      setcurrentAnimation('idle')
      setIsLoading(false)
      showAlert({
        show: true,
        message: 'Your message has not been succesfully sent!',
        type:'danger'
        
      })
      console.error('Failed to send email: ', error);
      
    })
  }
  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      {alert.show && <Alert {...alert} />}

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
            Email
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
            Message
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
      <div className='lgw-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight intensity={2.5} position={[0,0,1]} />
        <Suspense fallback={<Loader/>}>
          <Fox
          currentAnimation={currentAnimation}
            position = {[0.5, 0.35, 0]}
            rotattion={[12, -0.6, 0]}
            scale = {[0.5, 0.5, 0.5]}
            
          />
        </Suspense>
      </Canvas>
      </div>
    </section>
  )
}

export default Contact
