import { Collapse, Tag, Divider, Button } from 'antd';
import { QuestionCircleOutlined, MessageOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I join a medical camp?",
      answer: "Register through our website by selecting a camp and filling out the participant form. You'll receive a confirmation email with details.",
      category: "Participation"
    },
    {
      question: "Is participation free?",
      answer: "Most camps are free, but some specialized screenings may have nominal fees. Always check the camp details page for pricing.",
      category: "Cost"
    },
    {
      question: "Can I organize a camp with your team?",
      answer: "Absolutely! Contact our partnerships team with your proposed location, date, and target services. We provide logistical support and medical staff coordination.",
      category: "Organization"
    },
    {
      question: "What should I bring to the camp?",
      answer: "Please bring your ID, any existing medical reports, and a list of current medications. Wear comfortable clothing for easy examination.",
      category: "Preparation"
    },
    {
      question: "How are volunteers selected?",
      answer: "Volunteers undergo background checks and orientation training. Medical professionals must provide credentials.",
      category: "Volunteering"
    }
  ];

  return (
    <div className="bg-[var(--background)] p-8 md:p-12 lg:p-16">
      <div className="mb-12 text-center">
        <h2 className="mb-3 font-bold text-[var(--text)] text-3xl md:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="opacity-80 mx-auto max-w-2xl text-[var(--text)] text-lg">
          Quick answers to common questions about our medical camps
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <Collapse 
          accordion 
          bordered={false}
          expandIconPosition="end"
          className="bg-transparent"
          expandIcon={({ isActive }) => (
            <div className={`p-1 rounded-full ${isActive ? 'bg-[var(--accent)] text-white' : 'bg-[var(--secondary)]'}`}>
              <QuestionCircleOutlined />
            </div>
          )}
        >
          {faqs.map((faq, index) => (
            <Panel 
              key={index} 
              header={
                <div className="font-medium text-[var(--text)] text-2xl">
                  {faq.question}
                </div>
              }
              extra={<Tag className="bg-[var(--secondary)] p-2 text-lg">{faq.category}</Tag>}
              className="bg-white shadow-sm hover:shadow-md mb-4 border-0 rounded-lg transition-all"
            >
              <Divider className="bg-[var(--secondary)] my-3" />
              <p className="text-gray-700">{faq.answer}</p>
            </Panel>
          ))}
        </Collapse>

        <div className="mt-12 text-center">
          <p className="mb-6 text-[var(--text)]">
            Didn't find your answer?
          </p>
          <Button 
            size="large" 
            className="bg-[var(--primary)] hover:bg-[var(--accent)] px-8 h-12 font-medium text-[var(--text)]"
            icon={<MessageOutlined />}
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;