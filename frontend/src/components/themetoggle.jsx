import { useState, useEffect } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export default function ThemeToggle() {
  const [isDarkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }

    const navbar = document.querySelector('.navbar');
    const home = document.querySelector('.home');
    const room = document.querySelector('.room');
    const browser = document.querySelector('.browser');
    const mylist = document.querySelector('.mylist');
    const titlenav = document.querySelector('.title');
    const titlemb = document.querySelector('.titlemb');
    const root = document.querySelector('.root');
    const typereader = document.querySelector('.typereader');
    const des = document.querySelector('.des');
    const des2 = document.querySelector('.des2');
    const lastinfo = document.querySelector('.lastinfo');

    const lastcardhead1 = document.querySelector('.lastcard1head');
    const verify1 = document.querySelector('.verify1');
    const headtitle1 = document.querySelector('.headtitle1');
    const descrip1 = document.querySelector('.descrip1');

    const lastcardhead2 = document.querySelector('.lastcard2head');
    const verify2 = document.querySelector('.verify2');
    const headtitle2 = document.querySelector('.headtitle2');
    const descrip2 = document.querySelector('.descrip2');

    const lastcardhead3 = document.querySelector('.lastcard3head');
    const verify3 = document.querySelector('.verify3');
    const headtitle3 = document.querySelector('.headtitle3');
    const descrip3 = document.querySelector('.descrip3');

    const lastcardhead4 = document.querySelector('.lastcard4head');
    const verify4 = document.querySelector('.verify4');
    const headtitle4 = document.querySelector('.headtitle4');
    const descrip4 = document.querySelector('.descrip4');

    const loadcards = document.querySelectorAll('.loadcards');
    const loadtitle = document.querySelectorAll('.loadtitle');
    const loadloc = document.querySelectorAll('.loadloc');
    const loadroom = document.querySelectorAll('.loadroom');

    const foheader = document.querySelectorAll('.foheader');
    const fotitle1 = document.querySelectorAll('.fotitle1');
    const fotitle2 = document.querySelectorAll('.fotitle2');
    const fotitle3 = document.querySelectorAll('.fotitle3');

    const fodes1 = document.querySelector('.fodes1');
    const fodes2 = document.querySelector('.fodes2');
    const fodes3 = document.querySelector('.fodes3');

    const footerhead = document.querySelector('.footerhead');
    const footertitle = document.querySelector('.footertitle');
    const footerdescrip = document.querySelector('.footerdescrip');
    const footerlasttitle = document.querySelector('.footerlasttitle');
    const footerhome = document.querySelector('.footerhome');
    const footerbrowse = document.querySelector('.footerbrowse');
    const footerlist = document.querySelector('.footerlist');
    const footermylist = document.querySelector('.footermylist');
    const footerterm = document.querySelector('.footerterm');
    const footerpolicy = document.querySelector('.footerpolicy');
    const footercontact = document.querySelector('.footercontact');
    const footerlastcontact = document.querySelector('.footerlastcontact');
    const createrheader = document.querySelector('.createrheader');
    const createtitle = document.querySelector('.createtitle');
    const createsection = document.querySelector('.createsection');
    const createsmall = document.querySelector('.createsmall');
    const createop = document.querySelectorAll('.createop');
    const detailheader = document.querySelector('.detailheader');
    const detailtitle = document.querySelector('.detailtitle');

    const detailcard1 = document.querySelector('.detailcard1');
    const detailcard2 = document.querySelector('.detailcard2');
    const detailcard3 = document.querySelector('.detailcard3');

    const posttitle = document.querySelector('.posttitle');
    const browseheading = document.querySelector('.browseheading');
    const browsetable = document.querySelector('.browsetable');
    const broseqe = document.querySelector('.broseqe');
    const update = document.querySelector('.update');
    const roomate = document.querySelector('.roomate');

    if (roomate) {
      if (isDarkMode) {
        roomate.classList.remove('text-black');
        roomate.classList.add('text-white');
      } else {
        roomate.classList.remove('text-white');
        roomate.classList.add('text-black');
      }
    }
    if (update) {
      if (isDarkMode) {
        update.classList.add('bg-[#0f172a]');
        update.classList.remove('bg-[#fff]');
      } else {
        update.classList.remove('bg-[#0f172a]');
        update.classList.add('bg-[#fff]');
      }
    }
    if (broseqe) {
      if (isDarkMode) {
        broseqe.classList.add('bg-[#0f172a]', 'text-white');
        broseqe.classList.remove('bg-white', 'text-black');
      } else {
        broseqe.classList.remove('bg-[#0f172a]', 'text-white');
        broseqe.classList.add('bg-white', 'text-black', 'border-1', 'border-black');
      }
    }
    if (browsetable) {
      if (isDarkMode) {
        browsetable.classList.add('bg-[#1e293b]', 'text-white');
        browsetable.classList.remove('bg-white');
      } else {
        browsetable.classList.remove('bg-[#1e293b]', 'text-white');
        browsetable.classList.add('bg-white', 'text-black', 'border-1', 'border-black');
      }
    }
    if (browseheading) {
      if (isDarkMode) {
        browseheading.classList.add('bg-[#0f172a]', 'text-white');
        browseheading.classList.remove('bg-white', 'text-black');
      } else {
        browseheading.classList.remove('bg-[#0f172a]', 'text-white');
        browseheading.classList.add('bg-white');
      }
    }
    if (posttitle) {
      if (isDarkMode) {
        posttitle.classList.add('bg-[#1e293b]');
        posttitle.classList.remove('bg-[#fff]');
      } else {
        posttitle.classList.remove('bg-[#1e293b]', 'text-white');
        posttitle.classList.add('bg-[#fff]', 'border-1', 'border-black');
      }
    }
    if (detailcard3) {
      if (isDarkMode) {
        detailcard3.classList.add('bg-[#1e293b]');
        detailcard3.classList.remove('bg-[#fff]');
      } else {
        detailcard3.classList.remove('bg-[#1e293b]', 'text-white');
        detailcard3.classList.add('bg-[#fff]', 'border-1', 'border-black');
      }
    }
    if (detailcard2) {
      if (isDarkMode) {
        detailcard2.classList.add('bg-[#1e293b]');
        detailcard2.classList.remove('bg-[#fff]');
      } else {
        detailcard2.classList.remove('bg-[#1e293b]', 'text-white');
        detailcard2.classList.add('bg-[#fff]', 'border-1', 'border-black');
      }
    }
    if (detailcard1) {
      if (isDarkMode) {
        detailcard1.classList.add('bg-[#1e293b]');
        detailcard1.classList.remove('bg-[#fff]');
      } else {
        detailcard1.classList.remove('bg-[#1e293b]', 'text-white');
        detailcard1.classList.add('bg-[#fff]', 'border-1', 'border-black');
      }
    }
    if (detailtitle) {
      if (isDarkMode) {
        detailtitle.classList.add('bg-[#1e293b]');
        detailtitle.classList.remove('bg-[#fff]');
      } else {
        detailtitle.classList.remove('bg-[#1e293b]');
        detailtitle.classList.add('bg-[#fff]', 'border-1', 'border-black');
      }
    }
    if (detailheader) {
      if (isDarkMode) {
        detailheader.classList.add('bg-[#0f172a]');
        detailheader.classList.remove('bg-[#fff]');
      } else {
        detailheader.classList.remove('bg-[#0f172a]');
        detailheader.classList.add('bg-[#fff]');
      }
    }
    createop.forEach(createop => {
      if (isDarkMode) {
        createop.classList.add('text-white');
        createop.classList.remove('text-black');
      } else {
        createop.classList.remove('text-white');
        createop.classList.add('text-black');
      }
    });
    if (createsmall) {
      if (isDarkMode) {
        createsmall.classList.remove('text-black');
        createsmall.classList.add('text-white');
      } else {
        createsmall.classList.remove('text-white');
        createsmall.classList.add('text-black');
      }
    }

    if (createsection) {
      if (isDarkMode) {
        createsection.classList.remove('text-black');
        createsection.classList.add('text-white');
      } else {
        createsection.classList.remove('text-white');
        createsection.classList.add('text-black');
      }
    }
    if (createtitle) {
      if (isDarkMode) {
        createtitle.classList.remove('bg-white', 'text-black');
        createtitle.classList.add('bg-[#1e293b]', 'text-white');
      } else {
        createtitle.classList.remove('bg-[#1e293b]', 'text-white');
        createtitle.classList.add('bg-white', 'text-white', 'border-1', 'border-black');
      }
    }
    if (createrheader) {
      if (isDarkMode) {
        createrheader.classList.remove('bg-white', 'text-black');
        createrheader.classList.add('bg-[#1e293b]', 'text-white');
      } else {
        createrheader.classList.remove('bg-[#1e293b]', 'text-white');
        createrheader.classList.add('bg-white', 'text-black');
      }
    }
    if (footerlastcontact) {
      if (isDarkMode) {
        footerlastcontact.classList.remove('text-black');
        footerlastcontact.classList.add('text-white');
      } else {
        footerlastcontact.classList.remove('text-white');
        footerlastcontact.classList.add('text-black');
      }
    }
    if (footercontact) {
      if (isDarkMode) {
        footercontact.classList.remove('text-black');
        footercontact.classList.add('text-white');
      } else {
        footercontact.classList.remove('text-white');
        footercontact.classList.add('text-black');
      }
    }
    if (footerpolicy) {
      if (isDarkMode) {
        footerpolicy.classList.remove('text-black');
        footerpolicy.classList.add('text-white');
      } else {
        footerpolicy.classList.remove('text-white');
        footerpolicy.classList.add('text-black');
      }
    }
    if (footerterm) {
      if (isDarkMode) {
        footerterm.classList.remove('text-black');
        footerterm.classList.add('text-white');
      } else {
        footerterm.classList.remove('text-white');
        footerterm.classList.add('text-black');
      }
    }
    if (footermylist) {
      if (isDarkMode) {
        footermylist.classList.remove('text-black');
        footermylist.classList.add('text-white');
      } else {
        footermylist.classList.remove('text-white');
        footermylist.classList.add('text-black');
      }
    }
    if (footerlist) {
      if (isDarkMode) {
        footerlist.classList.remove('text-black');
        footerlist.classList.add('text-white');
      } else {
        footerlist.classList.remove('text-white');
        footerlist.classList.add('text-black');
      }
    }
    if (footerbrowse) {
      if (isDarkMode) {
        footerbrowse.classList.remove('text-black');
        footerbrowse.classList.add('text-white');
      } else {
        footerbrowse.classList.remove('text-white');
        footerbrowse.classList.add('text-black');
      }
    }
    if (footerhome) {
      if (isDarkMode) {
        footerhome.classList.remove('text-black');
        footerhome.classList.add('text-white');
      } else {
        footerhome.classList.remove('text-white');
        footerhome.classList.add('text-black');
      }
    }
    if (footerlasttitle) {
      if (isDarkMode) {
        footerlasttitle.classList.remove('text-black');
        footerlasttitle.classList.add('text-white');
      } else {
        footerlasttitle.classList.remove('text-white');
        footerlasttitle.classList.add('text-black');
      }
    }
    if (footerdescrip) {
      if (isDarkMode) {
        footerdescrip.classList.remove('text-black');
        footerdescrip.classList.add('text-white');
      } else {
        footerdescrip.classList.remove('text-white');
        footerdescrip.classList.add('text-black');
      }
    }
    if (footertitle) {
      if (isDarkMode) {
        footertitle.classList.remove('text-black');
        footertitle.classList.add('text-white');
      } else {
        footertitle.classList.remove('text-white');
        footertitle.classList.add('text-black');
      }
    }
    if (footerhead) {
      if (isDarkMode) {
        footerhead.classList.add('bg-[#1e293b]');
        footerhead.classList.remove('bg-[#fff]');
      } else {
        footerhead.classList.remove('bg-[#1e293b]');
        footerhead.classList.add('bg-[#fff]');
      }
    }
    if (fodes1) {
      if (isDarkMode) {
        fodes1.classList.remove('text-black');
        fodes1.classList.add('text-white');
      } else {
        fodes1.classList.remove('text-white');
        fodes1.classList.add('text-black');
      }
    }
    if (fodes2) {
      if (isDarkMode) {
        fodes2.classList.remove('text-black');
        fodes2.classList.add('text-white');
      } else {
        fodes2.classList.remove('text-white');
        fodes2.classList.add('text-black');
      }
    }
    if (fodes3) {
      if (isDarkMode) {
        fodes3.classList.remove('text-black');
        fodes3.classList.add('text-white');
      } else {
        fodes3.classList.remove('text-white');
        fodes3.classList.add('text-black');
      }
    }
    fotitle1.forEach(fotitle => {
      if (isDarkMode) {
        fotitle.classList.add('bg-[#1e293b]');
        fotitle.classList.remove('bg-[#fff]');
      } else {
        fotitle.classList.remove('bg-[#1e293b]');
        fotitle.classList.add('bg-[#fff]', 'border-1');
      }
    });
    fotitle2.forEach(fotitle => {
      if (isDarkMode) {
        fotitle.classList.add('bg-[#1e293b]');
        fotitle.classList.remove('bg-[#fff]');
      } else {
        fotitle.classList.remove('bg-[#1e293b]');
        fotitle.classList.add('bg-[#fff]', 'border-1');
      }
    });
    fotitle3.forEach(fotitle => {
      if (isDarkMode) {
        fotitle.classList.add('bg-[#1e293b]');
        fotitle.classList.remove('bg-[#fff]');
      } else {
        fotitle.classList.remove('bg-[#1e293b]');
        fotitle.classList.add('bg-[#fff]', 'border-1');
      }
    });
    foheader.forEach(foheader => {
      if (isDarkMode) {
        foheader.classList.add('text-white');
        foheader.classList.remove('text-black');
      } else {
        foheader.classList.remove('text-white');
        foheader.classList.add('text-black');
      }
    });
    loadcards.forEach(loadcard => {
      if (isDarkMode) {
        loadcard.classList.add('bg-[#1e293b]', 'text-white', 'border-1');
        loadcard.classList.remove('bg-[#fff]');
      } else {
        loadcard.classList.remove('bg-[#1e293b]', 'text-white');
        loadcard.classList.add('bg-[#fff]', 'text-white', 'border-1', 'border-black');
      }
    });
    loadroom.forEach(loadroom => {
      if (isDarkMode) {
        loadroom.classList.remove('text-black');
        loadroom.classList.add('text-white');
      } else {
        loadroom.classList.remove('text-white');
        loadroom.classList.add('text-black');
      }
    });
    loadtitle.forEach(loadtitle => {
      if (isDarkMode) {
        loadtitle.classList.remove('text-black');
        loadtitle.classList.add('text-white');
      } else {
        loadtitle.classList.remove('text-white');
        loadtitle.classList.add('text-black');
      }
    });
    loadloc.forEach(loadloc => {
      if (isDarkMode) {
        loadloc.classList.remove('text-black');
        loadloc.classList.add('text-white');
      } else {
        loadloc.classList.remove('text-white');
        loadloc.classList.add('text-black');
      }
    });
    if (descrip4) {
      if (isDarkMode) {
        descrip4.classList.remove('text-black');
        descrip4.classList.add('text-white');
      } else {
        descrip4.classList.remove('text-white');
        descrip4.classList.add('text-black');
      }
    }
    if (headtitle4) {
      if (isDarkMode) {
        headtitle4.classList.remove('text-black');
        headtitle4.classList.add('text-white');
      } else {
        headtitle4.classList.remove('text-white');
        headtitle4.classList.add('text-black');
      }
    }

    if (verify4) {
      if (isDarkMode) {
        verify4.classList.remove('text-blue-400');
        verify4.classList.add('text-blue-400');
      } else {
        verify4.classList.remove('text-blue-400');
        verify4.classList.add('text-blue-400');
      }
    }
    if (lastcardhead4) {
      if (isDarkMode) {
        lastcardhead4.classList.add('bg-[#1e293b]', 'text-white', 'border-1');
        lastcardhead4.classList.remove('bg-white', 'text-white');
      } else {
        lastcardhead4.classList.remove('bg-[#1e293b]', 'text-white');
        lastcardhead4.classList.add('bg-white', 'text-white', 'border-1', 'border-black');
      }
    }
    if (descrip3) {
      if (isDarkMode) {
        descrip3.classList.remove('text-black');
        descrip3.classList.add('text-white');
      } else {
        descrip3.classList.remove('text-white');
        descrip3.classList.add('text-black');
      }
    }
    if (headtitle3) {
      if (isDarkMode) {
        headtitle3.classList.remove('text-black');
        headtitle3.classList.add('text-white');
      } else {
        headtitle3.classList.remove('text-white');
        headtitle3.classList.add('text-black');
      }
    }

    if (verify3) {
      if (isDarkMode) {
        verify3.classList.remove('text-blue-400');
        verify3.classList.add('text-blue-400');
      } else {
        verify3.classList.remove('text-blue-400');
        verify3.classList.add('text-blue-400');
      }
    }
    if (lastcardhead3) {
      if (isDarkMode) {
        lastcardhead3.classList.add('bg-[#1e293b]', 'text-white', 'border-1');
        lastcardhead3.classList.remove('bg-white', 'text-white');
      } else {
        lastcardhead3.classList.remove('bg-[#1e293b]', 'text-white');
        lastcardhead3.classList.add('bg-white', 'text-white', 'border-1', 'border-black');
      }
    }
    if (descrip2) {
      if (isDarkMode) {
        descrip2.classList.remove('text-black');
        descrip2.classList.add('text-white');
      } else {
        descrip2.classList.remove('text-white');
        descrip2.classList.add('text-black');
      }
    }
    if (headtitle2) {
      if (isDarkMode) {
        headtitle2.classList.remove('text-black');
        headtitle2.classList.add('text-white');
      } else {
        headtitle2.classList.remove('text-white');
        headtitle2.classList.add('text-black');
      }
    }

    if (verify2) {
      if (isDarkMode) {
        verify2.classList.remove('text-blue-400');
        verify2.classList.add('text-blue-400');
      } else {
        verify2.classList.remove('text-blue-400');
        verify2.classList.add('text-blue-400');
      }
    }
    if (lastcardhead2) {
      if (isDarkMode) {
        lastcardhead2.classList.add('bg-[#1e293b]', 'text-white', 'border-1');
        lastcardhead2.classList.remove('bg-white', 'text-white');
      } else {
        lastcardhead2.classList.remove('bg-[#1e293b]', 'text-white');
        lastcardhead2.classList.add('bg-white', 'text-white', 'border-1', 'border-black');
      }
    }
    if (descrip1) {
      if (isDarkMode) {
        descrip1.classList.remove('text-black');
        descrip1.classList.add('text-white');
      } else {
        descrip1.classList.remove('text-white');
        descrip1.classList.add('text-black');
      }
    }
    if (headtitle1) {
      if (isDarkMode) {
        headtitle1.classList.remove('text-black');
        headtitle1.classList.add('text-white');
      } else {
        headtitle1.classList.remove('text-white');
        headtitle1.classList.add('text-black');
      }
    }

    if (verify1) {
      if (isDarkMode) {
        verify1.classList.remove('text-blue-400');
        verify1.classList.add('text-blue-400');
      } else {
        verify1.classList.remove('text-blue-400');
        verify1.classList.add('text-blue-400');
      }
    }
    if (lastcardhead1) {
      if (isDarkMode) {
        lastcardhead1.classList.add('bg-[#1e293b]', 'text-white', 'border-1');
        lastcardhead1.classList.remove('bg-white', 'text-white');
      } else {
        lastcardhead1.classList.remove('bg-[#1e293b]', 'text-white');
        lastcardhead1.classList.add('bg-white', 'text-white', 'border-1', 'border-black');
      }
    }
    if (lastinfo) {
      if (isDarkMode) {
        lastinfo.classList.remove('text-black');
        lastinfo.classList.add('text-white');
      } else {
        lastinfo.classList.remove('text-white');
        lastinfo.classList.add('text-black');
      }
    }
    if (des) {
      if (isDarkMode) {
        des.classList.remove('text-black');
        des.classList.add('text-white');
      } else {
        des.classList.remove('text-white');
        des.classList.add('text-black');
      }
    }
    if (des2) {
      if (isDarkMode) {
        des2.classList.add('text-white');
        des2.classList.remove('text-black');
      } else {
        des2.classList.remove('text-white');
        des2.classList.add('text-black');
      }
    }
    if (typereader) {
      if (isDarkMode) {
        typereader.classList.remove('text-black');
        typereader.classList.add('text-white');
      } else {
        typereader.classList.remove('text-white');
        typereader.classList.add('text-black');
      }
    }
    if (navbar) {
      if (isDarkMode) {
        navbar.classList.remove('bg-white/70', 'text-black');
        navbar.classList.add('bg-[#111827]/70', 'text-white');
      } else {
        navbar.classList.remove('bg-[#111827]/70', 'text-white');
        navbar.classList.add('bg-white/70', 'text-black');
      }
    }
    if (room) {
      if (isDarkMode) {
        room.classList.remove('text-black');
        room.classList.add('text-white');
      } else {
        room.classList.remove('text-white');
        room.classList.add('text-black');
      }
    }
    if (titlenav) {
      if (isDarkMode) {
        titlenav.classList.remove('text-black');
        titlenav.classList.add('text-white');
      } else {
        titlenav.classList.remove('text-white');
        titlenav.classList.add('text-black');
      }
    }
    if (titlemb) {
      if (isDarkMode) {
        titlemb.classList.remove('text-black');
        titlemb.classList.add('text-white');
      } else {
        titlemb.classList.remove('text-white');
        titlemb.classList.add('text-black');
      }
    }
    if (browser) {
      if (isDarkMode) {
        browser.classList.remove('text-black');
        browser.classList.add('text-white');
      } else {
        browser.classList.remove('text-white');
        browser.classList.add('text-black');
      }
    }
    if (mylist) {
      if (isDarkMode) {
        mylist.classList.remove('text-black');
        mylist.classList.add('text-white');
      } else {
        mylist.classList.remove('text-white');
        mylist.classList.add('text-black');
      }
    }
    if (home) {
      if (isDarkMode) {
        home.classList.remove('text-black');
        home.classList.add('text-white');
      } else {
        home.classList.remove('text-white');
        home.classList.add('text-black');
      }
    }
    if (root) {
      if (isDarkMode) {
        root.classList.remove('bg-[#fff]');
        root.classList.add('bg-[#0f172a]');
      } else {
        root.classList.add('bg-[#fff]');
        root.classList.remove('bg-[#0f172a]');
      }
    }
    if (isDarkMode) {
      document.documentElement.style.backgroundColor = '#111827';
    } else {
      document.documentElement.style.backgroundColor = '#fff';
    }
  }, [isDarkMode]);

  return (
    <DarkModeSwitch
      checked={isDarkMode}
      onChange={setDarkMode}
      size={24}
      sunColor="#fbbf24"
      moonColor="#60a5fa"
    />
  );
}