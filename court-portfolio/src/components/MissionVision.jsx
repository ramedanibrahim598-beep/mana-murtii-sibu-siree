import React from 'react';

const MissionVision = () => {
  return (
    <section id="mission-vision" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-navy-800 mb-10">
          Ergama, Mul’ataa fi Duudhaalee
        </h2>

        <p className="text-gray-700 leading-relaxed mb-8 text-center">
          Galma gahiinsa tarsiimoo keessatti ergamni, mul’atnii fi duudhaaleen jiraachuu qofa otoo hin taane sadarkaa barbaadamuun hubatamuun hojjetamuu qaba. Manneen murtii naannoo keenyaa gahee hojii isaaniif kenname hojii seera hiikuu sirnaan bahachuudhaan ol’aantummaa seeraa mirkaneessanii gahee nageenya, misoomaa fi ijaarsa sirna dimokiraasii biyyaa keessatti qaban bahuudhaaf ergama, mul’ataa fi duudhaalee armaan gadii qaama tarsiimoo fi karoora manneen murtii taasisuun ni hojjetama.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-navy-700 mb-4">ERGAMA</h3>
            <p className="text-gray-700 leading-relaxed">
              Tajaajila abbaa seerummaa qulqulluu, dhaqqabamaa, si’ataa fi bu’a qabeessa ta’e, seera qofa irratti hundaa’uudhaan, haala loogii fi gartummaan ala ta’een kennuu fi bilisummaa guutuu fi itti gaafatamummaa ol’aanaadhaan hojii isaanii raawwachuu dha.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-navy-700 mb-4">MUL’ATA</h3>
            <p className="text-gray-700 leading-relaxed">
              Bara 2022tti Mana Murtii Seera hiikuun haqaa fi Ol’aantummaa seeraa mirkaneessee amantaa uummataa horachuun biyya keenya keessatti fakkenya ta’ee arguu;
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-navy-700 mb-4">DUUDHAALEE</h3>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>Bilisummaa fi itti gaafatamummaa abbaa seerummaa,</li>
              <li>Beekumsaa fi Gahumsa,</li>
              <li>Miira tajaajiltummaa,</li>
              <li>Iftoomina,</li>
              <li>Fayyalummaa,</li>
              <li>Al-loogummaa fi wal-qixxummaa,</li>
              <li>Tilmaamamummaa,</li>
              <li>Ejjennoo Gaarii</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
