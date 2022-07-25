import React from 'react'
import NavHeader from "./NavHeader";
import FooterSection from "./FooterSection";


function Toc() {
  return (
    <div className="relative bg-white overflow-hidden">
        <NavHeader />
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="text-lg max-w-prose mx-auto">
                <h1>
                    <span className="mt-8 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">Terms and Conditions</span>
                    <span className="block text-base text-center text-[#f0c14b] font-semibold tracking-wide uppercase">Welcome to Abacus!</span>
                </h1>
                <p className="mt-8 text-xl text-gray-500 leading-8">
                    These terms and conditions outline the rules and regulations for the use of Abacus's Website, located at https://abacus-355820.web.app/.
                </p>
                <p className="mt-8 text-xl text-gray-500 leading-8">
                    By accessing this website we assume you accept these terms and conditions. Do not continue to use Abacus if you do not agree to take all of the terms and conditions stated on this page.
                </p>
                <p className="mt-8 text-xl text-gray-500 leading-8">
                    The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
                </p>
                <p className="mt-8 text-xl text-gray-500 leading-8">
                    <strong>Cookies</strong><br/><br/>
                    We employ the use of cookies. By accessing Abacus, you agreed to use cookies in agreement with the Abacus's Privacy Policy.<br/><br/>
                    Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
                    
                </p>
                <p className="mt-8 text-xl text-gray-500 leading-8">
                    <strong>License</strong><br/><br/>
                    Unless otherwise stated, Abacus and/or its licensors own the intellectual property rights for all material on Abacus. All intellectual property rights are reserved. You may access this from Abacus for your own personal use subjected to restrictions set in these terms and conditions
                </p>
                <p className="mt-8 text-xl text-gray-500 leading-8">
                    Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Abacus does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Abacus,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Abacus shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
                </p>
                <p className="mt-8 mb-8 text-xl text-gray-500 leading-8">
                    <strong>Content Liability</strong><br/><br/>
                    We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
                </p>
            </div>
        </div>
        <FooterSection />
    </div>



  )
}

export default Toc