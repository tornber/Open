import React,{useState,useEffect,useContext} from 'react'
import {FormDataContext} from './FormDataContext'
import './GeneratedCV.css'

const ExperienceCV = () => {
    
    const {formData} = useContext(FormDataContext)
    const [aboutMyselfText,setAboutMyselfText] = useState([{index: 0,text: ''}])

    const handleTextWrap = (i) => {
        const value = formData.experiences[i].description
        if(value.length >= 90) {
            if(value.length % 90 === 0) {
                const updatedTextArray = [...aboutMyselfText]
                if(updatedTextArray[i]) {
                    updatedTextArray[i].text = updatedTextArray[i].text + '\n'
                }
                setAboutMyselfText((prevAboutMyselfText) => updatedTextArray)
                
            } else {
                const ind = value.length - (value.length % 90)
                if(aboutMyselfText[i]) {
                    const prevText = aboutMyselfText[i].text.substring(0,ind)
                    const updatedTextArray = [...aboutMyselfText]
                    updatedTextArray[i].text = prevText + value.substring(ind)
                    setAboutMyselfText((prevAboutMyselfText) => updatedTextArray)
                }
            }
        } else {
            const updatedTextArray = [...aboutMyselfText]
            if(updatedTextArray[i]) {
                updatedTextArray[i].text = value
            } else {
                updatedTextArray.push({index: i,text: value})
            }
            setAboutMyselfText((prevAboutMyselfText) => updatedTextArray)
        }
    }

    useEffect(() => {
        formData.experiences.map((experience,ind) => {
            if(ind >= aboutMyselfText.length) {
                setAboutMyselfText((prevAboutMyselfText) => [...prevAboutMyselfText,{index: aboutMyselfText.length,text:experience.description}])
            }
        })
        formData.experiences.forEach((experience,ind) => {
            handleTextWrap(ind)
        })

    },[formData.experiences])

    return (
    <div className="cv--experience">
        {formData.experiences[0].position && (<h3 className='cv--about--myself'>გამოცდილება</h3>)}
        {formData.experiences.map((form,ind) => {
            return (
                <div key={ind}>
                    {form.position && (<p className='cv--position'>{form.position}{form?.employer !== "" ? `, ${form.employer}` : ''}</p>)}
                    {form.start_date && (<p className='cv--dates'>{form.start_date} - {form?.due_date}</p>)}
                    {aboutMyselfText[ind] && (<p className='about--myself--content'>{aboutMyselfText[ind].text}</p>)}
                </div>
            )
        })}
        {formData.experiences[0].position && (<div className='experiences-cv--line'></div>)}
    </div>
  )
}

export default ExperienceCV
