import React from 'react';

import {
    StyleSheet,
    View,
    Text,
  } from 'react-native';

const AdditionalHistory = () =>
(
  <View>
    <Text style={styles.historyDescription}>
      In 1971, Bachelor of Science in Fishery Education (BSFED), with Dr. Elpidio M. Icamina as superintendent, was offered. In 1975,
      Bachelor of Science in Fisheries, with majors in Marine Fisheries, Inland Fisheries, and Fish Processing Technology, was offered.
    </Text>

    <Text style={styles.historyDescription}>
      In 1976, the school broadened its offerings with courses such as, Associate in Agriculture; Bachelor of Science in Agriculture,
      majors in Animal Husbandry and Agronomy; Bachelor of Science in Marine Transportation; and Bachelor of Science in Practical Arts.
      Another milestone in the history of the school was the offering of Master of Arts in Teaching Vocational Education, in consortium
      with the Iloilo School of Arts and Trades, Iloilo City. On August 21, 1978, the Iloilo Regional School of Fisheries was converted
      into the Iloilo State College of Fisheries per P.D. 1523 on June 11, 1978 through the efforts of Dr. Narciso D. Monfort, the leadership
      of Dr. Elpidio M. Icamina as its first president, and the cooperation of the faculty and staff of the school and
      the good people of Barotac Nuevo. This marked the birth of the first and only state college of fisheries in the country.
    </Text>

    <Text style={styles.historyDescription}>
      Iloilo State College of Fisheries offered excellent training in the field of fisheries and advanced education both in the campus
      and other satellite schools. The state college broadened its curricular offerings in Technology, Educational Management and Public
      Administration; a postgraduate degree in Rural Development; Bachelor of Science in Marine Biology; Bachelor of Science in Fisheries;
      Bachelor of Science in Marine Transportation; Bachelor in Secondary Education; and Bachelor of Science in Ecological Tourism.
    </Text>

    <Text style={styles.historyDescription}>
      In 1979, the Marine Science Research Center was constructed in Lapuz-Lapuz, Dumangas, Iloilo. On March 3, 1983, the Old
      Sagay Barangay High School in Sagay, Negros Occidental, was converted into ISCOF—Sagay Branch. In 1984, the BSMT building
      was constructed in Alacaygan, Banate, Iloilo. on Dr. Icamina’s retirement, Mr. Benigno P. Panistante was installed as second
      ISCOF president on July 1, 1987.
    </Text>

    <Text style={styles.historyDescription}>
      In the 80’s, Fisheries Management was approved as one of the major fields of BS Fisheries (BSF), a ladderized curriculum of the Bachelor
      of Science in Marine Transportation (BSMT) and Certificate in Marine Transportation (CMT). Also, the State College of Agriculture ASCA-ISCOF
      graduate education consortium program on Master of Arts in Educational Management (MAEM), major in Vocational Productivity, started.
    </Text>

    <Text style={styles.historyDescription}>
      In 1992, Dr. Elpidio A. Locsin, Jr. was elected as the third president. Major developments were implemented in the College.
    </Text>

    <Text style={styles.historyDescription}>
    In consonance with RA 8760 in 2002, the following CHED-Supervised Institutions (CSIs) were integrated with ISCOF as its Branch 
    Schools: Dumangas Polytechnic College (DPC), Dumangas, Iloilo; Barotac Nuevo Polytechnic Institute (BNPI), Barotac Nuevo, Iloilo; 
    San Enrique Polytechnic College (SEPC), San Enrique, Iloilo; and Dingle Agricultural and Technical College (DATEC), Dingle, Iloilo. 
    Dr. Wenceslao O. Sison, PASUC President, was designated OIC President in view of the vacancy left by Dr. Locsin.
    </Text>

    <Text style={styles.historyDescription}>
    In 2007, the fifth president, Dr. Ramon C. Cabag, was sworn into office. Due to his secondment, he returned to his original 
    school, the West Visayas State University, after two years. The Regional Director of the Commission on Higher Education acted 
    as the OIC-President for a year as a result of the vacancy left by Dr. Cabag.
    </Text>

    <Text style={styles.historyDescription}>
    On March 16, 2008, the Board of Trustees installed into office the sixth president, Dr. Ma. Rosario Allones Panes who has been 
    untiringly and dynamically working for the universityhood of the College, with the strong support of the Honorable Congressman 
    Ferjenel G. Biron who sponsored the bill.
    </Text>

    <Text style={styles.historyDescription}>
    On March 17, 2013, Dr. Panes finished her term as SUC President II prompting the Board of Trustees to search for 
    the next president. While the search was ongoing, Dr. Panes assumed as OIC-President.
    </Text>

    <Text style={styles.historyDescription}>
    On June 11, 2013 His Excellency Benigno Simeon Aquino III signed into law Republic Act No. 10604, an act converting 
    ISCOF into the Iloilo State University of Science and Technology, the 10th university in the Province of Iloilo.
    </Text>

    <Text style={styles.historyDescription}>
    Through Board of Trustees Resolution No. 34 series of 2013, Dr. Ramon G. Zarceno was appointed as the seventh 
    ISCOF President on April 15, 2013 and assumed office on June 13, 2013.
    </Text>

    <Text style={styles.historyDescription}>
    Engineer Godelyn Gallega-Hisole, DM, Dean of the Electronics and Communication Engineering and electrical 
    Engineering Department of the Western Visayas College of Science and Technology (WVCST), formally assumed 
    office as the 8th SUC President II of the Iloilo State College of Fisheries by virtue of the official 
    appointment by the ISCOF Board of Trustees led by Commissioner J. Prospero E. De Vera III of the Commission on 
    Higher Education (CHED). The entry of a qualified “outsider” in the ISCOF system is envisioned to bring about 
    significant growth and development of the College.
    </Text>

    <Text style={styles.historyDescription}>
    Congressman Ferjenel G. Biron of the 4th District of Iloilo sponsored the House Bill that finally led to 
    the enactment and signing into law of Republic Act No. 10604 thus converting the status of ISCOF to that 
    of a University.
    </Text>

  </View>
)

const styles = StyleSheet.create({
    historyDescription: {
      marginTop: 5,
      fontSize: 14,
      color: '#666',
    },
  });

export default AdditionalHistory;