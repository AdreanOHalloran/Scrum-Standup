import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ScrumList } from './ScrumList';
import { TeamSelect } from './TeamSelect';

export const WholeTeamList = () => {
  const { teamId } = useParams();

  useEffect(() => {
    getTMs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId]);

  const getTMs = async () => {
    const request = await fetch('/api/v1/teamMembers');
    const data = await request.json();
    let TMS = data.data;
    if (teamId) {
      TMS = TMS.filter((tm) => tm.teams.indexOf(teamId) >= 0);
    }
    TMS = Array.from(new Set(TMS.map((tm) => tm.name))).sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1));
    setTeamMembers(TMS);
  };

  const [teamMembers, setTeamMembers] = useState();

  const handleGetFreshList = () => {
    getTMs();
  };

  return (
    <div className="pt-5">
      <ScrumList handleTMClick={false} TMS={teamMembers} removeTM={false} />
      <div className="pt-3" />
      <TeamSelect />
    </div>
  );
};
