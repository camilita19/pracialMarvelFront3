/* eslint-disable react/prop-types */
import { getFaqs } from '../../../services/faqs/getFaqs'
import { type GetStaticProps, type NextPage } from 'next'
import { type FaqsType } from '../../../components/faqs/faqsData'
import LayoutGeneral from '../../../components/layouts/layout-general'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import BodySingle from '../../../components/layouts/body/single/body-single'

interface FaqPageProps {
  faqs: FaqsType[];
}

const FaqsPage: NextPage<FaqPageProps> = ({ faqs }) => {
  return (
    <LayoutGeneral>
      <BodySingle title="Preguntas Frecuentes (FAQ)">
        {faqs.map((faq) => (
          <Accordion key={faq.id}>
            <AccordionSummary id="panel-header" aria-controls="panel-content" expandIcon={<ExpandMoreIcon />}>
              {faq.question}
            </AccordionSummary>
            <AccordionDetails>{faq.answer}</AccordionDetails>
          </Accordion>
        ))}
      </BodySingle>
    </LayoutGeneral>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const faqs = await getFaqs()
    return {
      props: {
        faqs,
      },
      // revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return {
      props: {
        faqs: [],
      },
    }
  }
}

export default FaqsPage

