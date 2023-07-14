import React, { useState } from 'react';
import TabPanel from './TabPanel';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { Link } from 'react-router-dom';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const tabs = [
    {
      title:
        <a class="px-4 py-2 text-sm text-white shadow-sm border-transparent bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 inline-flex items-center border font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2">
          Members
        </a>,
      content: <img class="imagesize" srcset="https://www.bird.club/assets/backgrounds/members@2x-c6df03f3dc11e655adede8d313b224034491d1b005d3a681d072f7b13ce3fae8.png 2x, https://www.bird.club/assets/backgrounds/members@4x-446ecc01c8dbc51f62034ad1c56013aee65d7ff18e510a8c816cfd7d1717d164.png 4x" src="https://www.bird.club/assets/backgrounds/members-9a5cc7db9e3ef95139d59b5a49eda7aeeb2e6891a221cef79b611e0f765c1506.png" />
    },
    {
      title: <a class="px-4 py-2 text-sm text-white shadow-sm border-transparent bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 inline-flex items-center border font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2" >
        Records and Photos
      </a>,
      content: <img class="imagesize" srcset="https://www.bird.club/assets/backgrounds/records@2x-d0a94643fa9429602430ee7e53f44bb8b04763de8d772f4be859e434dc445787.png 2x, https://www.bird.club/assets/backgrounds/records@4x-5941424ce7741d46c7fbe237a39576938286459432d4b7717d702a76e83ed17b.png 4x" src="https://www.bird.club/assets/backgrounds/records-f07111142a5005914e16151bc879ba47eb8d3840f19e795a0b99ed420e21c5bc.png" />
    },
    {
      title: <a class="px-4 py-2 text-sm text-white shadow-sm border-transparent bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 inline-flex items-center border font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2" >
        Site Guide
      </a>,
      content: <img class="imagesize" srcset="https://www.bird.club/assets/backgrounds/site-guide@2x-d666721af091e3a9915ff57f659ebd6e033c91792ead2a5676590cd04f597aa7.png 2x, https://www.bird.club/assets/backgrounds/site-guide@4x-152c4b03017fb246d2b43475c18e870942ce5258bcbf8b363e00a24b29f07a6e.png 4x" src="https://www.bird.club/assets/backgrounds/site-guide-ba982cc2742ebc0b669d0fc615bc61b5364ec8cf67fff927e2d9a0c5d810a83a.png" />
    },
    {
      title: <a class="px-4 py-2 text-sm text-white shadow-sm border-transparent bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 inline-flex items-center border font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2">
        Communication
      </a>,
      content: <img class="imagesize" srcset="https://www.bird.club/assets/backgrounds/conversation@2x-273410a47c7e65828764d0a396e0fd6b259cd520568156b2f2416dddef0ae471.png 2x, https://www.bird.club/assets/backgrounds/conversation@4x-bbd490a157c1afc1306de63fd93470b613f9d02077ea55be51c8a27b201d4a89.png 4x" src="https://www.bird.club/assets/backgrounds/conversation-9ad65d8aa216203b450d432a1cdc9452fa9522f70ea99b6dfbddb507b953fa1d.png" />
    },
  ];
  
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main class="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
          {/* introducing */}
          <div class="pt-20 pb-16 text-center lg:pt-32 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 class="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
              Your bird club
              <span> </span>
              <span class="relative whitespace-nowrap text-teal-600">
                online
              </span>
            </h1>

            <p class="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
              Whether it’s for a large club or just you and your friends, BirdClub provides you with a space to connect, share records and publish photos - all for free.
            </p>

            <div class="mt-10 mb-36 lg:mb-44 flex justify-center space-x-6">
              <Link class="px-4 py-2 text-sm text-white shadow-sm border-transparent bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 inline-flex items-center border font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2" to="/signup">
                Join Us
              </Link>
              <Link class="px-4 py-2 text-sm border-gray-300 text-gray-700 bg-white hover:border-gray-500 focus:ring-teal-500 inline-flex items-center border font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2" to="/club">
                Tell me more
              </Link>
            </div>

            <div class="relative flex items-center mx-auto self-center justify-center overflow-x-hidden">
              <div class="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-white w-24 md:w-48"></div>
              <div class="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-white w-24 md:w-48"></div>
              <div class="mx-4">
                <div class="w-20 h-20 bg-cyan-100 flex items-center justify-center rounded-full overflow-hidden  flex-shrink-0">
                  <img src="https://www.bird.club/assets/avatars/black-headed-gull-f151c37de13f1ed99a297681894a8f31499cab39745d4cd2029d1ad6d75f9ff6.png" />
                </div>

              </div>
              <div class="mx-4">
                <div class="w-20 h-20 bg-purple-100 flex items-center justify-center rounded-full overflow-hidden  flex-shrink-0">
                  <img src="https://www.bird.club/assets/avatars/blue-robin-22b4b166199b86bb5f398f24627f1bb89fe3dfced4bd556fa3ed8093e02b29cc.png" />
                </div>

              </div>
              <div class="mx-4">
                <div class="w-20 h-20 bg-yellow-100 flex items-center justify-center rounded-full overflow-hidden  flex-shrink-0">
                  <img src="https://www.bird.club/assets/avatars/roller-7966721032ced0a6dbb83110c6f6f7de3f0e5dfa06c70e629d497a39f2e78238.png" />
                </div>

              </div>
              <div class="mx-4">
                <div class="w-20 h-20 bg-blue-100 flex items-center justify-center rounded-full overflow-hidden  flex-shrink-0">
                  <img src="https://www.bird.club/assets/avatars/hummingbird-d4090d97d92a9495c20d45e0687031086795c87ce46c186c74455f7a26cf71fb.png" />
                </div>

              </div>
              <div class="mx-4">
                <div class="w-20 h-20 bg-rose-100 flex items-center justify-center rounded-full overflow-hidden  flex-shrink-0">
                  <img src="https://www.bird.club/assets/avatars/falcon-fb43924909f2277bbdaaec60ad450332284dc286d142a80ea68debf1312b53e2.png" />
                </div>

              </div>
              <div class="mx-4">
                <div class="w-20 h-20 bg-emerald-100 flex items-center justify-center rounded-full overflow-hidden  flex-shrink-0">
                  <img src="https://www.bird.club/assets/avatars/golden-eagle-3cf097db0c636fff1be9f97eac41662cf18be707357c3c5cd95f8754e7abbfc7.png" />
                </div>

              </div>
              <div class="mx-4">
                <div class="w-20 h-20 bg-rose-100 flex items-center justify-center rounded-full overflow-hidden  flex-shrink-0">
                  <img src="https://www.bird.club/assets/avatars/bald-eagle-252320a29095a03e00b62f682d042300cb659a0c55b71b01ee021f1a9b9e7218.png" />
                </div>

              </div>
              <div class="mx-4">
                <div class="w-20 h-20 bg-rose-100 flex items-center justify-center rounded-full overflow-hidden  flex-shrink-0">
                  <img src="https://www.bird.club/assets/avatars/great-tit-1aa6ae3d681a730c15333f361ea5d98c48aa627083e4926c6ff7f762a342fb91.png" />
                </div>

              </div>
              <div class="mx-4">
                <div class="w-20 h-20 bg-rose-100 flex items-center justify-center rounded-full overflow-hidden  flex-shrink-0">
                  <img src="https://www.bird.club/assets/avatars/cuckoo-6c0c306f0f78a5cdb92e54e3da1576e0f01f9ea8e43a1159ee0d813bb7fbf117.png" />
                </div>

              </div>
              <div class="mx-4">
                <div class="w-20 h-20 bg-violet-100 flex items-center justify-center rounded-full overflow-hidden  flex-shrink-0">
                  <img src="https://www.bird.club/assets/avatars/nightjar-36fe6508a49f31df194fe4fcc4b059e60b10b086e61be21f42e528d2f0666691.png" />
                </div>

              </div>
              <div class="mx-4">
                <div class="w-20 h-20 bg-blue-100 flex items-center justify-center rounded-full overflow-hidden  flex-shrink-0">
                  <img src="https://www.bird.club/assets/avatars/blackbird-a6ba93fe6bccee602686ddbdf158776e2b52cdf9262479cf041a46ce70424aa7.png" />
                </div>

              </div>
              <div class="mx-4">
                <div class="w-20 h-20 bg-purple-100 flex items-center justify-center rounded-full overflow-hidden  flex-shrink-0">
                  <img src="https://www.bird.club/assets/avatars/sparrow-600ff0b17fd3f82412c023d86af2b2b4403571106d54d333b45163b8ad4d206f.png" />
                </div>

              </div>
              <div class="mx-4">
                <div class="w-20 h-20 bg-neutral-100 flex items-center justify-center rounded-full overflow-hidden  flex-shrink-0">
                  <img src="https://www.bird.club/assets/avatars/pheasant-65b1b6b9ce9a9da52522ee217ac87a839099604e50e76cf8149e167e8d41cd52.png" />
                </div>

              </div>
            </div>
          </div>


          <section class="backgroundcolor1">
            <div class="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
              <div className='margin-top-5'>
                <h2 id="features-title" class="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
                  Bird clubs made simple.
                </h2>
                <p class="mt-6 text-lg tracking-tight text-teal-100">
                  Everything you need is in one place: members, records, photos, and more.
                </p>
                <br />
                <TabPanel tabs={tabs} />
              </div>
            </div>
          </section>

          <section class="backgroundcolor2">

            <div className="margin-top-bot">
              <div class="mx-auto max-w-2xl md:text-center">
                <h2 class="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
                  We want birding to thrive.
                </h2>
                <p class="mt-4 text-lg tracking-tight text-slate-700">
                  By making it as easy as possible to run an online community of local birdwatchers.
                </p>
              </div>
            </div>
            <div class="-mx-4 mt-20 space-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 ">
              <div>
                <div class="mx-auto max-w-2xl">
                  <div class="w-10 h-10 rounded-lg bg-teal-600 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="text-white ml-0.5 pt-1 w-9 h-9">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>

                  </div>
                  <h3 class="mt-6 text-sm font-medium text-teal-600">
                    Website
                  </h3>
                  <p class="mt-2 font-display text-xl text-slate-900">
                    A free website for your club.
                  </p>
                  <p class="mt-4 text-sm text-slate-600">
                    By creating a club, you get your own customizable website. You can upload a logo, choose your club colours and add your favourite birding spots.
                  </p>
                </div>
                <div class="relative mt-10 pb-10">
                  <div class="absolute -inset-x-4 bottom-0 top-8 bg-slate-100 sm:-inset-x-6"></div>
                  <div class="relative mx-auto aspect-[844/428] w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
                    <img srcset="https://www.bird.club/assets/backgrounds/website@2x-bfa63e1090723fdee3e143be87d563bfdf02dc854d6abdff26c5d30d4b0ada6f.png 2x, https://www.bird.club/assets/backgrounds/website@4x-a5c11e2e2399523df3f2da4d82e5d2c19f7b724791a02d7f50d074b7f8287e4d.png 4x" src="https://www.bird.club/assets/backgrounds/website-d51062eb79cb61ac20071aee0a4efec3950d40488b991d011f14e442dc48bfdd.png" />
                  </div>
                </div>
              </div>

              <div>
                <div class="mx-auto max-w-2xl opacity-75 hover:opacity-100">
                  <div class="w-10 h-10 rounded-lg bg-teal-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="text-white ml-0.5 pt-1 w-9 h-9">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                    </svg>

                  </div>
                  <h3 class="mt-6 text-sm font-medium text-slate-600">
                    Engagement
                  </h3>
                  <p class="mt-2 font-display text-xl text-slate-900">
                    Build a community.
                  </p>
                  <p class="mt-4 text-sm text-slate-600">
                    Members of your club can like, comment and interact with one another via your club’s website. BirdClub is a social network for groups of birders, whether large or small.
                  </p>
                </div>
                <div class="relative mt-10 pb-10">
                  <div class="absolute -inset-x-4 bottom-0 top-8 bg-slate-100 sm:-inset-x-6"></div>
                  <div class="relative mx-auto aspect-[844/428] w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
                    <img srcset="https://www.bird.club/assets/backgrounds/community@2x-b4ff79f54e755ad845c20b7db6456e7943dec4400eafe9ef6261f09cdeb9ae58.png 2x, https://www.bird.club/assets/backgrounds/community@4x-6cd0c2d49b6f27ab8c641660c2985ad15e9876b643ad910cd3e66b07b9e52227.png 4x" src="https://www.bird.club/assets/backgrounds/community-a06f0005f6b369943ffef398fb9303dea4b1f10dcf0ca6ac5ae263cc787ea9eb.png" />
                  </div>
                </div>
              </div>

              <div>
                <div class="mx-auto max-w-2xl opacity-75 hover:opacity-100">
                  <div class="w-10 h-10 rounded-lg bg-teal-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="text-white ml-0.5 pt-1 w-9 h-9">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                    </svg>

                  </div>
                  <h3 class="mt-6 text-sm font-medium text-slate-600">
                    Communication
                  </h3>
                  <p class="mt-2 font-display text-xl text-slate-900">
                    No more mailing lists.
                  </p>
                  <p class="mt-4 text-sm text-slate-600">
                    Share and enjoy each other’s photos via our photo gallery. Photos are classified by species to make it easier to find the photo you’re looking for.
                  </p>
                </div>
                <div class="relative mt-10 pb-10">
                  <div class="absolute -inset-x-4 bottom-0 top-8 bg-slate-100 sm:-inset-x-6"></div>
                  <div class="relative mx-auto aspect-[844/428] w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
                    <img srcset="https://www.bird.club/assets/backgrounds/gallery@2x-22d1b2c1b8c289bfcc0887d8f43cdc65d6272c4ab5856d8b3b9a228ad9070a7f.png 2x, https://www.bird.club/assets/backgrounds/gallery@4x-ae2e4d55b59dda20fff057737b79d16c85f2b969700300bc841f33d0bf26cc70.png 4x" src="https://www.bird.club/assets/backgrounds/gallery-3d8fc15c923049ef272a14a00a5c20f516051b7fd45ec53f89cdcb22b9d5d485.png" />
                  </div>
                </div>
              </div>
            </div>

            <div class="-mx-4 mt-20 space-y-10  px-4 sm:-mx-6 sm:px-6 ">
              <div>
                <div class="mx-auto max-w-2xl">
                  <div class="w-10 h-10 rounded-lg bg-teal-600 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="text-white ml-0.5 pt-1 w-9 h-9">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>

                  </div>
                  <h3 class="mt-6 text-sm font-medium text-teal-600">
                    Website
                  </h3>
                  <p class="mt-2 font-display text-xl text-slate-900">
                    A free website for your club.
                  </p>
                  <p class="mt-4 text-sm text-slate-600">
                    By creating a club, you get your own customizable website. You can upload a logo, choose your club colours and add your favourite birding spots.
                  </p>
                </div>
                <div class="relative mt-10 pb-10">
                  <div class="absolute -inset-x-4 bottom-0 top-8 bg-slate-100 sm:-inset-x-6"></div>
                  <div class="relative mx-auto aspect-[844/428] w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
                    <img srcset="https://www.bird.club/assets/backgrounds/website@2x-bfa63e1090723fdee3e143be87d563bfdf02dc854d6abdff26c5d30d4b0ada6f.png 2x, https://www.bird.club/assets/backgrounds/website@4x-a5c11e2e2399523df3f2da4d82e5d2c19f7b724791a02d7f50d074b7f8287e4d.png 4x" src="https://www.bird.club/assets/backgrounds/website-d51062eb79cb61ac20071aee0a4efec3950d40488b991d011f14e442dc48bfdd.png" />
                  </div>
                </div>
              </div>

              <div>
                <div class="mx-auto max-w-2xl opacity-75 hover:opacity-100">
                  <div class="w-10 h-10 rounded-lg bg-teal-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="text-white ml-0.5 pt-1 w-9 h-9">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                    </svg>

                  </div>
                  <h3 class="mt-6 text-sm font-medium text-slate-600">
                    Engagement
                  </h3>
                  <p class="mt-2 font-display text-xl text-slate-900">
                    Build a community.
                  </p>
                  <p class="mt-4 text-sm text-slate-600">
                    Members of your club can like, comment and interact with one another via your club’s website. BirdClub is a social network for groups of birders, whether large or small.
                  </p>
                </div>
                <div class="relative mt-10 pb-10">
                  <div class="absolute -inset-x-4 bottom-0 top-8 bg-slate-100 sm:-inset-x-6"></div>
                  <div class="relative mx-auto aspect-[844/428] w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
                    <img srcset="https://www.bird.club/assets/backgrounds/community@2x-b4ff79f54e755ad845c20b7db6456e7943dec4400eafe9ef6261f09cdeb9ae58.png 2x, https://www.bird.club/assets/backgrounds/community@4x-6cd0c2d49b6f27ab8c641660c2985ad15e9876b643ad910cd3e66b07b9e52227.png 4x" src="https://www.bird.club/assets/backgrounds/community-a06f0005f6b369943ffef398fb9303dea4b1f10dcf0ca6ac5ae263cc787ea9eb.png" />
                  </div>
                </div>
              </div>

              <div>
                <div class="mx-auto max-w-2xl opacity-75 hover:opacity-100">
                  <div class="w-10 h-10 rounded-lg bg-teal-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="text-white ml-0.5 pt-1 w-9 h-9">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                    </svg>

                  </div>
                  <h3 class="mt-6 text-sm font-medium text-slate-600">
                    Communication
                  </h3>
                  <p class="mt-2 font-display text-xl text-slate-900">
                    No more mailing lists.
                  </p>
                  <p class="mt-4 text-sm text-slate-600">
                    Share and enjoy each other’s photos via our photo gallery. Photos are classified by species to make it easier to find the photo you’re looking for.
                  </p>
                </div>
                <div class="relative mt-10 pb-10">
                  <div class="absolute -inset-x-4 bottom-0 top-8 bg-slate-100 sm:-inset-x-6"></div>
                  <div class="relative mx-auto aspect-[844/428] w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
                    <img srcset="https://www.bird.club/assets/backgrounds/gallery@2x-22d1b2c1b8c289bfcc0887d8f43cdc65d6272c4ab5856d8b3b9a228ad9070a7f.png 2x, https://www.bird.club/assets/backgrounds/gallery@4x-ae2e4d55b59dda20fff057737b79d16c85f2b969700300bc841f33d0bf26cc70.png 4x" src="https://www.bird.club/assets/backgrounds/gallery-3d8fc15c923049ef272a14a00a5c20f516051b7fd45ec53f89cdcb22b9d5d485.png" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* we want to build thrive */}



          {/* dụ người dùng đăng kí */}
          <section>
            <div class="backgroundcolor1">
              <div class="relative sm:py-16">
                <div class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
                  <div class="relative px-6 py-10  overflow-hidden sm:px-12 sm:py-20">
                    <div class="relative">
                      <div class="sm:text-center">
                        <h2 class="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
                          Keep me in the loop.
                        </h2>
                        <p class="mt-6 mx-auto max-w-2xl tracking-tight text-teal-100">
                          Sign up to receive regular updates on what we’re up to at BirdClub.
                        </p>
                      </div>
                      <div class="mt-10 mb-36 lg:mb-44 flex justify-center space-x-6">
                        <a class="px-4 py-2 text-sm text-white shadow-sm border-transparent bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 inline-flex items-center border font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2" href="/signin">
                          Sign in
                        </a>
                        <a class="px-4 py-2 text-sm text-white shadow-sm border-transparent bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 inline-flex items-center border font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2" href="/signup">
                          Sign up
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
            {/* Question for bird club */}

            <section class="backgroundcolor3">

              <h2 id="faq-title" class="sr-only">
                Frequently Asked Questions
              </h2>
              <div class="absolute top-0 left-1/2 -translate-x-[30%] -translate-y-[25%]">
              </div>
              <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="mx-auto max-w-2xl lg:mx-0">
                  <p class="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
                    Frequently Asked Questions
                  </p>
                  <p class="mt-4 text-lg tracking-tight text-slate-700">
                    Still not convinced? Try reading over our frequently asked questions or <a class="text-teal-600 hover:text-teal-900" href="mailto:hello@bird.club">reach out to us directly</a> to learn more.
                  </p>
                </div>
                <ul class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
                  <li>
                    <ul class="space-y-8">
                      <li key="{faqIndex}">
                        <h3 class="font-display text-lg leading-7 text-slate-900">
                          Why is BirdClub free?
                        </h3>
                        <p class="mt-4 text-sm text-slate-700">
                          We are a non-profit organization driven by our purpose. We believe that bird clubs play an important role in birders’ lives and local conservation. We want to help them thrive by providing them and their members with free access to our site.
                        </p>
                      </li>

                      <li key="{faqIndex}">
                        <h3 class="font-display text-lg leading-7 text-slate-900">
                          How is BirdClub financed?
                        </h3>
                        <p class="mt-4 text-sm text-slate-700">
                          We rely on donations from our founders. In the future we will also allow clubs and individuals to make voluntary donations to BirdClub to help cover the cost of managing our site.
                        </p>
                      </li>

                      <li key="{faqIndex}">
                        <h3 class="font-display text-lg leading-7 text-slate-900">
                          Can anyone create a club?
                        </h3>
                        <p class="mt-4 text-sm text-slate-700">
                          Yes. And not every club needs a president, secretary or treasurer! Some of our most active clubs are simply groups of friends who share a passion for birdwatching.
                        </p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul class="space-y-8">
                      <li key="{faqIndex}">
                        <h3 class="font-display text-lg leading-7 text-slate-900">
                          Why can’t I find my local club?
                        </h3>
                        <p class="mt-4 text-sm text-slate-700">
                          Clubs are invite-only, your club admin will need to send you an invite to join. Alternatively, your club might not have been created - just <a class="text-teal-600 hover:text-teal-900" href="/clubs/new">share this link</a> with your club admin!
                        </p>
                      </li>

                      <li key="{faqIndex}">
                        <h3 class="font-display text-lg leading-7 text-slate-900">
                          Can anyone see my club page?
                        </h3>
                        <p class="mt-4 text-sm text-slate-700">
                          No. Clubs are invite-only; only the people you ask to join can access your site.
                        </p>
                      </li>

                      <li key="{faqIndex}">
                        <h3 class="font-display text-lg leading-7 text-slate-900">
                          Is BirdClub only for UK birders?
                        </h3>
                        <p class="mt-4 text-sm text-slate-700">
                          BirdClub was born in the UK, but we support international bird groups via the IOC World Bird List. If you’d like us to add a specific bird list for your country, just let us know!
                        </p>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <ul class="space-y-8">
                      <li key="{faqIndex}">
                        <h3 class="font-display text-lg leading-7 text-slate-900">
                          Will you be releasing new features?
                        </h3>
                        <p class="mt-4 text-sm text-slate-700">
                          Yes! We’re constantly working on new features to make running bird clubs as easy as possible. Future features will include a mobile app, online events for clubs and the ability to add trip lists.
                        </p>
                      </li>

                      <li key="{faqIndex}">
                        <h3 class="font-display text-lg leading-7 text-slate-900">
                          Did I see you at Global BirdFair?
                        </h3>
                        <p class="mt-4 text-sm text-slate-700">
                          Yes! We were proud to officially launch BirdClub at the 2022 Global BirdFair and enjoyed speaking with hundreds of birders about how to take their bird club online.
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </section>
        </main>
        <footer class="mt-8" aria-labelledby="footer-heading">
          <h2 id="footer-heading" class="sr-only">Footer</h2>
          <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8">
            <div class="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
              <div class="flex space-x-6 md:order-2">
                <a href="mailto:hello@bird.club" class="text-gray-400 hover:text-gray-900">Contact us</a>
              </div>
              <p class="mt-8 text-base text-gray-400 md:mt-0 md:order-1">© 2023 BirdClub. All rights reserved.</p>
            </div>
          </div>
        </footer>

      </div>

    </div >
  );
}

export default Dashboard;




