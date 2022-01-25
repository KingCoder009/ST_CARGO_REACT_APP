import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Master',
    path:"#",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'ItemValues',
        path: '/itemvalue',
        cName: 'sub-nav'
      },
	  {
        title: 'kyc',
        path: '/kyc',
        cName: 'sub-nav'
      },
      
    ],
  },
  {
    title: 'Operation',
    path:"#",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'MAWB-Invoice Entry',
        path: '/mawb_invoice',
        cName: 'sub-nav'
      },
      {
        title: 'Invoice Entry Updation',
        path: '/operation/invoic_updetion',
        cName: 'sub-nav'
      },
      {
        title: 'KYC Upload',
        path: '/kyc_updation',
        cName: 'sub-nav'
      },
      {
        title: 'Data Correction',
        path: '/operation/data_crction',
        cName: 'sub-nav'
      },
      {
        title: 'KYC Update/Delete',
        path: '/operation/kyc_updation_delete',
        cName: 'sub-nav'
      },
      {
        title: 'IGM Generetion',
        path: '/operation/igm_genaretion',
        cName: 'sub-nav'
      },
      {
        title: 'MAWB-Clearance Entry',
        path: '/operation/mawb_clr_entry',
        cName: 'sub-nav'
      },
      {
        title: 'POD/ID Proof Upload',
        path: '/operation/pod_id_proof',
        cName: 'sub-nav'
      },
      {
        title: 'AirwaybillUpdate',
        path: '/operation/air_way_bils',
        cName: 'sub-nav'
      },
      {
        title: 'GST Entry',
        path: '/operation/gst_entry',
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Reports',
    path:"#",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Clearance Document',
        path: '/reports/clearancedacument',
        cName: 'sub-nav'
      },
      {
        title: 'Clearance Record',
        path: '/reports/clr_record',
        cName: 'sub-nav'
      },
      {
        title: 'KYC Download',
        path: '/reports/Kyc_downlode',
        cName: 'sub-nav'
      },
      {
        title: 'GST Clearance Record',
        path: '/reports/gst_clr_loc',
        cName: 'sub-nav'
      },
      {
        title: 'IDproof Download',
        path: '/reports/id_proof_dwnload',
        cName: 'sub-nav'
      },
      {
        title: 'MAWB-Tracking',
        path: '/reports/mawb_tracking',
        cName: 'sub-nav'
      },
      {
        title: 'Documents-Download',
        path: '/reports/document_download',
        cName: 'sub-nav'
      },
    ]
  },
];
