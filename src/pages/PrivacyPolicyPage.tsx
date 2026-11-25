import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div>
      <section className="bg-[#0B1020] text-white py-14 sm:py-16 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4F8CFF] mb-2">
            Legal &amp; Data Handling
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Privacy Policy
          </h1>
        </div>
      </section>

      <section className="bg-[#F5F7FB] text-[#172033] py-14 sm:py-16">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-7 sm:p-10 space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
            <div>
              <h2 className="text-lg font-bold text-[#172033] mb-2">
                1. Contact &amp; Enquiry Information
              </h2>
              <p>
                When you submit an enquiry through our Contact page, the details you provide (Full Name, Email Address, optional Business Name, Service Required, and Message) are transmitted securely to notify the AI Growth Lab team at{' '}
                <a
                  href="mailto:team.aigrowthlab@gmail.com"
                  className="text-[#2F6BFF] underline underline-offset-2"
                >
                  team.aigrowthlab@gmail.com
                </a>{' '}
                solely for responding to your request.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#172033] mb-2">
                2. Interaction Analytics Playground Data
              </h2>
              <p>
                Text transcripts submitted in the Interaction Analytics Playground are sent to our server-side endpoint solely to generate the requested live analysis. Submitted transcripts are not permanently stored by default, are not logged unnecessarily on the server, and are not sent to third-party website analytics tools. Visitors are requested not to submit confidential or personally identifiable customer information.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#172033] mb-2">
                3. AI Growth Lab Assistant (Phase 1)
              </h2>
              <p>
                The floating AI Growth Lab Assistant operates locally in your browser using predefined FAQ topics and answers without sending chat inputs to external generative AI models.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#172033] mb-2">
                4. Questions
              </h2>
              <p>
                For any questions regarding this privacy policy or how enquiries are handled, please email{' '}
                <a
                  href="mailto:team.aigrowthlab@gmail.com"
                  className="text-[#2F6BFF] underline underline-offset-2"
                >
                  team.aigrowthlab@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
