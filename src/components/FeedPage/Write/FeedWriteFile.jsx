import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

export default function FeedWriteFile({title, mandatory = false, guide, name, value, explain}) {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState([])
  const [preview, setPreview] = useState([])

  return (
    <div className='border-2 rounded-md mt-6'>
    <div className="flex justify-between title h-16 leading-[64px]">
        <h2 className='ml-6'>{title}
        {mandatory === true ? <span className='text-gray-500'>*필수질문</span> : null}
        </h2>
        <button type="button" className="btn btn-sm block bg-white hover:bg-white border-none mr-3 h-[62px] hover:opacity-50" onClick={() => setOpen(!open)}>
          <ChevronDownIcon className={`w-6 h-6 text-black
          ${open === true ? 'rotate-0' : 'rotate-180'}
        `}/>
        </button>
      </div>
      <div className={`
        content 
        transition-all
        duration-500 
        ease-in-out origin-top
        overflow-hidden
        ml-6
        text-sm
        ${open === true ? 'h-96' : 'h-0'}`}>
        <div className="img-box flex">
          <label htmlFor="file" className='absolute w-px h-px -m-px overflow-hidden'>
          이미지 파일 선택
          </label>
          <input type="file" className='img block' onChange={null} id="file"
          accept="image/jpeg, image/png"/>
          <input type="hidden" name="introImg" value={img}/>
        </div>
      <label htmlFor={name + "Input"} className='absolute w-px h-px -m-px overflow-hidden'>
        {explain} 적는 곳
      </label>
      <textarea 
      className={`
      bg-white w-full h-96 focus:outline-0 border-b-2 border-gray-200 mt-3
      `}
      type="text"
      placeholder={guide} 
      name={name}
      value={value}
      />
      </div>
    </div>
  )  
}