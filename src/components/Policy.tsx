import React from 'react'
import NavHeader from "./NavHeader";
import FooterSection from "./FooterSection";


function Policy() {
  return (
    <div className="relative bg-white overflow-hidden">
        <NavHeader />
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="text-lg max-w-prose mx-auto">
                <h1>
                    <span className="mt-8 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">Your Privacy</span>
                    <span className="block text-base text-center text-[#f0c14b] font-semibold tracking-wide uppercase">Please read Privacy Policy</span>
                </h1>
                <p className="mt-8 text-xl text-gray-500 leading-8">
                    <strong>Reservation of Rights</strong><br/><br/>
                    We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
                </p>
                <p className="mt-8 text-xl text-gray-500 leading-8">
                    <strong>Removal of links from our website</strong><br/><br/>
                    If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.<br/><br/>
                    We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
                </p>
                <p className="mt-8 mb-8 text-xl text-gray-500 leading-8">
                    <strong>Disclaimer</strong><br/><br/>
                    To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website.<br/><br/>
                    The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.<br/><br/>
                    As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
                </p>
            </div>
        </div>
        <FooterSection />
    </div>



  )
}

export default Policy