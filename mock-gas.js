(function () {
  'use strict';
  const KEY = 'ylsh-campus-demo-v030';
  const WINDOW_PREFIX = 'YLSH_DEMO_STATE:';
  const clone = value => JSON.parse(JSON.stringify(value));
  const nowText = () => '2026-11-09 09:' + String(new Date().getMinutes()).padStart(2, '0');
  const uid = prefix => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8).toUpperCase()}`;
  const students = [
    {email:'demo10101@gapp.ylsh.ilc.edu.tw',student_id:'D10101',student_name:'林宜真',class_name:'101',seat_no:'01'},
    {email:'demo10102@gapp.ylsh.ilc.edu.tw',student_id:'D10102',student_name:'陳柏宇',class_name:'101',seat_no:'02'},
    {email:'demo20208@gapp.ylsh.ilc.edu.tw',student_id:'D20208',student_name:'黃品妍',class_name:'202',seat_no:'08'},
    {email:'demo30512@gapp.ylsh.ilc.edu.tw',student_id:'D30512',student_name:'張凱翔',class_name:'305',seat_no:'12'},
    {email:'demo31106@gapp.ylsh.ilc.edu.tw',student_id:'D31106',student_name:'吳思妤',class_name:'311',seat_no:'06'}
  ];
  function defaults() {
    return {
      activeStudent: students[0].email,
      slots: [
        {slot_id:'S-1109-1230',unit_id:'SA',unit_name:'學務處',service_date:'2026-11-09',slot_label:'午休',start_time:'12:30',capacity:15,booked_count:3,remaining:12,is_open:true},
        {slot_id:'S-1109-1600',unit_id:'SA',unit_name:'學務處',service_date:'2026-11-09',slot_label:'放學',start_time:'16:00',capacity:15,booked_count:4,remaining:11,is_open:true},
        {slot_id:'S-1110-1230',unit_id:'SA',unit_name:'學務處',service_date:'2026-11-10',slot_label:'午休',start_time:'12:30',capacity:15,booked_count:14,remaining:1,is_open:true},
        {slot_id:'S-1110-1600',unit_id:'LIB',unit_name:'圖書館',service_date:'2026-11-10',slot_label:'放學',start_time:'16:00',capacity:10,booked_count:2,remaining:8,is_open:true},
        {slot_id:'S-1111-1230',unit_id:'SA',unit_name:'學務處',service_date:'2026-11-11',slot_label:'午休',start_time:'12:30',capacity:15,booked_count:0,remaining:15,is_open:false}
      ],
      bookings: [
        {booking_id:'BK-DEMO-001',student_email:students[0].email,student_id:'D10101',student_name:'林宜真',class_name:'101',seat_no:'01',service_date:'2026-11-09',start_time:'12:30',slot_label:'午休',slot_id:'S-1109-1230',unit_id:'SA',unit_name:'學務處',purpose:'志工服務',status:'BOOKED',service_hours:'',can_cancel:true},
        {booking_id:'BK-DEMO-002',student_email:students[1].email,student_id:'D10102',student_name:'陳柏宇',class_name:'101',seat_no:'02',service_date:'2026-11-09',start_time:'12:30',slot_label:'午休',slot_id:'S-1109-1230',unit_id:'SA',unit_name:'學務處',purpose:'愛校服務',status:'BOOKED',service_hours:'',can_cancel:true},
        {booking_id:'BK-DEMO-003',student_email:students[2].email,student_id:'D20208',student_name:'黃品妍',class_name:'202',seat_no:'08',service_date:'2026-11-09',start_time:'16:00',slot_label:'放學',slot_id:'S-1109-1600',unit_id:'SA',unit_name:'學務處',purpose:'志工服務',status:'BOOKED',service_hours:'',can_cancel:true},
        {booking_id:'BK-DEMO-004',student_email:students[0].email,student_id:'D10101',student_name:'林宜真',class_name:'101',seat_no:'01',service_date:'2026-10-22',start_time:'16:00',slot_label:'放學',slot_id:'OLD',unit_id:'LIB',unit_name:'圖書館',purpose:'志工服務',status:'COMPLETED',service_hours:2,can_cancel:false}
      ],
      histories: {
        [students[0].email]: [
          {service_date:'2026-09-18',service_unit:'圖書館',service_content:'書架整理與環境清潔',service_hours:2,status:'志工',certification_unit:'圖書館',notes:'表現良好'},
          {service_date:'2026-10-22',service_unit:'學務處',service_content:'校園環境服務',service_hours:2,status:'志工',certification_unit:'學務處',notes:''}
        ],
        [students[1].email]: [{service_date:'2026-10-03',service_unit:'衛生組',service_content:'健康宣導資料整理',service_hours:1.5,status:'志工',certification_unit:'衛生組',notes:''}],
        [students[2].email]: [{service_date:'2026-09-27',service_unit:'圖書館',service_content:'閱讀活動場佈',service_hours:3,status:'志工',certification_unit:'圖書館',notes:''}]
      },
      bloodOpen: true,
      bloodRegistrations: [],
      education: {active:true,pretest_open:true,posttest_open:false},
      mail: {enabled:true,test_mode:true,logs:[]}
    };
  }
  function load() { try { const raw=String(window.name||'').startsWith(WINDOW_PREFIX)?String(window.name).slice(WINDOW_PREFIX.length):(localStorage.getItem(KEY)||'');return Object.assign(defaults(), raw?JSON.parse(raw):{}); } catch (_) { return defaults(); } }
  let db = load();
  function save() { const raw=JSON.stringify(db);window.name=WINDOW_PREFIX+raw;localStorage.setItem(KEY,raw); }
  function currentStudent() { return students.find(s => s.email === db.activeStudent) || students[0]; }
  function portalData() {
    return {generated_at:nowText(),server_elapsed_ms:120,identity:{type_label:'系統管理員／研習展示',name:'衛生組長 DEMO',meta:'AI 虛擬帳號',email:'demo.admin@gapp.ylsh.ilc.edu.tw'},modules:[
      {title:'學生服務預約',subtitle:'志工服務・愛校服務・銷過服務',description:'操作日期、時段、預約與個人志工履歷。',icon:'服',theme:'blue',url:'volunteer.html',action_label:'進入功能'},
      {title:'捐血活動報名',subtitle:'師生共同參與・熱血助人',description:'操作活動報名、出生日期、時段與個人紀錄。',icon:'血',theme:'red',url:'blood.html',action_label:'進入功能'},
      {title:'教職員健康教育專區',subtitle:'教材資源・前測・後測',description:'瀏覽教育資源與前後測開放狀態。',icon:'學',theme:'green',url:'education.html',action_label:'進入功能'},
      {title:'管理後台',subtitle:'名單・點名・統計・通知',description:'操作點名、時段、捐血、前後測、履歷與郵件中心。',icon:'管',theme:'dark',url:'admin.html',action_label:'進入管理後台'},
      {title:'校園線上報修',subtitle:'設備異常・環境維修・進度查詢',description:'本展示版保留正式入口外觀，不送出真實報修。',icon:'修',theme:'amber',url:'#',action_label:'展示版未連線'},
      {title:'合作社專區',subtitle:'校園合作社・線上服務',description:'本展示版保留正式入口外觀，不連接其他專案。',icon:'合',theme:'purple',url:'#',action_label:'展示版未連線'}
    ]};
  }
  function studentHome(email) {
    if (email && students.some(s=>s.email===email)) db.activeStudent=email;
    const student=currentStudent(); const mine=db.bookings.filter(b=>b.student_email===student.email);
    const days=[]; for(let i=0;i<14;i++){const d=new Date('2026-11-09T00:00:00');d.setDate(d.getDate()+i);const key=d.toISOString().slice(0,10);const slots=db.slots.filter(s=>s.service_date===key);days.push({date:key,month_day:`${d.getMonth()+1}/${d.getDate()}`,weekday:'日一二三四五六'[d.getDay()],note:slots.length?'研習展示開放日':'非服務日',availability:slots.some(s=>s.is_open&&s.remaining>0)?'AVAILABLE':'CLOSED',slots:clone(slots)});}
    const rows=clone(db.histories[student.email]||[]); return {generated_at:nowText(),server_elapsed_ms:90,base_url:'index.html',student,monthly:{booked:mine.filter(b=>b.status==='BOOKED').length,limit:5},my_bookings:clone(mine),service_history:{rows,total_hours:rows.reduce((n,r)=>n+Number(r.service_hours||0),0)},days,purposes:['志工服務','愛校服務','銷過服務'],access:{mode:'STUDENT',selected_student_email:student.email,preview_students:students}};
  }
  function adminHome(){const today=db.bookings.filter(b=>b.service_date==='2026-11-09');return {app_version:'1.4.0',generated_at:nowText(),base_url:'index.html',identity:{email:'demo.admin@gapp.ylsh.ilc.edu.tw',name:'衛生組長 DEMO',role:'SUPER_ADMIN',role_label:'系統管理員',unit_id:'',unit_name:'全部單位'},summary:{today_total:today.length,today_pending:today.filter(b=>b.status==='BOOKED').length,active_bookings:db.bookings.filter(b=>b.status==='BOOKED').length,completed_month:db.bookings.filter(b=>b.status==='COMPLETED').length,no_show_month:db.bookings.filter(b=>b.status==='NO_SHOW').length,closed_slots:db.slots.filter(s=>!s.is_open).length},today:clone(today),recent_bookings:clone(db.bookings),upcoming_slots:clone(db.slots),units:[{unit_id:'SA',unit_name:'學務處',is_active:true},{unit_id:'LIB',unit_name:'圖書館',is_active:true},{unit_id:'HEALTH',unit_name:'衛生組',is_active:true}],purposes:['志工服務','愛校服務','銷過服務']};}
  function bloodHome(){const p=currentStudent();const regs=db.bloodRegistrations.filter(r=>r.participant_email===p.email);const event={event_id:'BD-20261110',event_name:'宜中秋季愛心捐血活動',event_date:'2026-11-10',start_time:'09:00',end_time:'16:00',location:'學生活動中心前廣場',registration_deadline:'2026-11-09 17:00',description:'捐出熱血，讓善意在校園延續。',notes:'',is_open:db.bloodOpen,has_availability:true,time_slots:[{start_time:'09:00',remaining:13},{start_time:'10:00',remaining:9},{start_time:'11:00',remaining:15},{start_time:'13:00',remaining:12},{start_time:'14:00',remaining:8},{start_time:'15:00',remaining:14}],registration:regs.find(r=>r.status!=='CANCELLED')||null};return {generated_at:nowText(),server_elapsed_ms:80,base_url:'index.html',participant:{key:p.email,type:'STUDENT',email:p.email,id:p.student_id,name:p.student_name,class_name:p.class_name,seat_no:p.seat_no,display_meta:`${p.class_name}班 ${p.seat_no}號`},access:{mode:'STUDENT',actor_email:p.email,selected_participant_key:p.email,preview_participants:students.map(s=>({key:s.email,type:'STUDENT',email:s.email,id:s.student_id,name:s.student_name,class_name:s.class_name,seat_no:s.seat_no,display_meta:`${s.class_name}班 ${s.seat_no}號`}))},events:[event],my_registrations:clone(regs)};}
  function bloodAdmin(){return {generated_at:nowText(),actor:'demo.admin@gapp.ylsh.ilc.edu.tw',students_ready:1485,staff_ready:126,retention_days:90,events:[{event_id:'BD-20261110',event_name:'宜中秋季愛心捐血活動',event_date:'2026-11-10',start_time:'09:00',end_time:'16:00',location:'學生活動中心前廣場',registration_deadline:'2026-11-09 17:00',configured_open:db.bloodOpen,accepting_registration:db.bloodOpen,counts:{total:42,active:40,checked_in:6,completed:3}}]};}
  function eduAdmin(){return {generated_at:nowText(),campaigns:[{campaign_id:'EDU-2026-HIV',campaign_name:'115學年度教職員愛滋及性傳染病教育',start_date:'2026-09-01',end_date:'2026-12-31',is_active:db.education.active,in_date_range:true,pretest_url:'https://docs.google.com/forms/d/e/demo-pre/viewform',posttest_url:'https://docs.google.com/forms/d/e/demo-post/viewform',pretest_open:db.education.pretest_open,posttest_open:db.education.posttest_open}]};}
  function educationHome(){return {generated_at:nowText(),base_url:'index.html',campaign:{campaign_id:'EDU-2026-HIV',campaign_name:'115學年度教職員研習',start_date:'2026-09-01',end_date:'2026-12-31',pretest_url:'https://docs.google.com/forms/d/e/demo-pre/viewform',posttest_url:'https://docs.google.com/forms/d/e/demo-post/viewform',description:''},availability:{campaign_open:db.education.active,pretest_open:db.education.active&&db.education.pretest_open,posttest_open:db.education.active&&db.education.posttest_open,message:db.education.active?'教育活動已開放。':'教材可自由瀏覽，前後測表單尚未開放。'},resources:[{resource_id:'R1',sort_order:1,category:'核心課程',resource_type:'VIDEO',title:'U=U 數位課程',description:'從科學實證理解測不到就不會透過性行為傳染。',url:'https://www.cdc.gov.tw/',estimated_minutes:124,is_required:true},{resource_id:'R2',sort_order:2,category:'防治觀念',resource_type:'ARTICLE',title:'PrEP 與 PEP 基礎',description:'認識暴露前與暴露後預防。',url:'https://www.cdc.gov.tw/',estimated_minutes:15,is_required:false}],completion:{pretest_completed:true,pretest_submitted_at:'2026-11-09 08:40',pretest_score:85,posttest_completed:false,posttest_submitted_at:'',posttest_score:'',status:'PRETEST_ONLY'}};}
  function mailCenter(){const templates=[{template_key:'GENERAL_NOTICE',template_name:'一般通知',scope:'GENERAL',subject_template:'【宜中校園服務】通知',body_template:'{{student_name}}同學您好：\n這是一封展示通知。',is_active:true},{template_key:'BOOKING_TODAY',template_name:'今日服務提醒',scope:'BOOKING',subject_template:'【宜中】今日服務提醒',body_template:'請準時前往{{unit_name}}報到。',is_active:true},{template_key:'HISTORY_PDF',template_name:'志工履歷寄送',scope:'HISTORY',subject_template:'【宜中】個人志工服務履歷',body_template:'附件為你的志工服務履歷。',is_active:true}];return {settings:{enabled:db.mail.enabled,test_mode:db.mail.test_mode,sender_name:'國立宜蘭高中學務處衛生組',reply_to:''},remaining_quota:94,summary:{today_total:db.mail.logs.length,today_accepted:db.mail.logs.length,today_failed:0,pending:0},general_templates:templates.filter(t=>t.scope==='GENERAL'),templates,recent_logs:clone(db.mail.logs)};}
  const api = {
    PORTAL_getHomeData:portalData,
    getStudentHomeData:studentHome,
    bookSlotForCurrentStudent(slotId,purpose){const s=currentStudent(),slot=db.slots.find(x=>x.slot_id===slotId);if(!slot)throw Error('找不到服務時段。');const b={booking_id:uid('BK-DEMO'),student_email:s.email,student_id:s.student_id,student_name:s.student_name,class_name:s.class_name,seat_no:s.seat_no,service_date:slot.service_date,start_time:slot.start_time,slot_label:slot.slot_label,slot_id:slot.slot_id,unit_id:slot.unit_id,unit_name:slot.unit_name,purpose,status:'BOOKED',service_hours:'',can_cancel:true};db.bookings.push(b);slot.booked_count++;slot.remaining--;save();return {home:studentHome()};},
    cancelCurrentStudentBooking(id){const b=db.bookings.find(x=>x.booking_id===id);if(b)b.status='CANCELLED';save();return studentHome();},
    ADMIN_getHomeData:adminHome,
    ADMIN_searchBookings(filters={}){let rows=clone(db.bookings);if(filters.status&&filters.status!=='ALL')rows=rows.filter(r=>r.status===filters.status);const q=String(filters.query||'').toLowerCase();if(q)rows=rows.filter(r=>JSON.stringify(r).toLowerCase().includes(q));return {rows,total:rows.length,returned_limit:200};},
    ADMIN_searchStudents(q=''){q=String(q).toLowerCase();return students.filter(s=>!q||JSON.stringify(s).toLowerCase().includes(q));},
    ADMIN_createBooking(p){const s=students.find(x=>x.email===p.student_email),slot=db.slots.find(x=>x.slot_id===p.slot_id);if(!s||!slot)throw Error('請選擇學生與時段。');db.bookings.push({booking_id:uid('BK-DEMO'),student_email:s.email,student_id:s.student_id,student_name:s.student_name,class_name:s.class_name,seat_no:s.seat_no,service_date:slot.service_date,start_time:slot.start_time,slot_label:slot.slot_label,slot_id:slot.slot_id,unit_id:slot.unit_id,unit_name:slot.unit_name,purpose:p.purpose,status:'BOOKED',service_hours:'',can_cancel:true});slot.booked_count++;slot.remaining--;save();return {home:adminHome()};},
    ADMIN_markAttendance(id,status,hours){const b=db.bookings.find(x=>x.booking_id===id);if(b){b.status=status;b.service_hours=status==='COMPLETED'?Number(hours):'';if(status==='COMPLETED'){db.histories[b.student_email]=db.histories[b.student_email]||[];db.histories[b.student_email].push({service_date:b.service_date,service_unit:b.unit_name,service_content:b.purpose,service_hours:Number(hours),status:'志工',certification_unit:b.unit_name,notes:'由 DEMO 點名完成'});}}save();return adminHome();},
    ADMIN_cancelBooking(id){const b=db.bookings.find(x=>x.booking_id===id);if(b)b.status='CANCELLED';save();return adminHome();},
    ADMIN_updateSlot(id,p){const s=db.slots.find(x=>x.slot_id===id);if(s){s.capacity=Number(p.capacity);s.is_open=!!p.is_open;s.remaining=Math.max(0,s.capacity-s.booked_count);}save();return adminHome();},
    BLOOD_getParticipantHomeData:bloodHome,BLOOD_getPreviewParticipants(){return bloodHome().access.preview_participants;},
    BLOOD_registerForEvent(eventId,p){const s=currentStudent();db.bloodRegistrations.push({registration_id:uid('BDR-DEMO'),event_id:eventId,event_name:'宜中秋季愛心捐血活動',event_date:'2026-11-10',participant_email:s.email,participant_type:'STUDENT',appointment_time:p.appointment_time,status:'REGISTERED',registered_at:nowText(),can_cancel:true,donation_completed:false});save();return {audit_id:uid('AUDIT'),home:bloodHome()};},
    BLOOD_cancelRegistration(id){const r=db.bloodRegistrations.find(x=>x.registration_id===id);if(r){r.status='CANCELLED';r.can_cancel=false;}save();return {audit_id:uid('AUDIT'),home:bloodHome()};},
    BLOOD_adminRegisterParticipant(eventId,key,p){db.activeStudent=key;return api.BLOOD_registerForEvent(eventId,p);},BLOOD_adminCancelRegistration(id){return api.BLOOD_cancelRegistration(id);},
    EDU_getStaffPortalData:educationHome,
    ADMIN_getBloodAdminData:bloodAdmin,
    ADMIN_createBloodEvent(p){db.bloodOpen=!!p.is_open;save();return bloodAdmin();},
    ADMIN_setBloodEventOpen(id,v){db.bloodOpen=!!v;save();return bloodAdmin();},
    BLOOD_deleteExpiredSensitiveData(){return {deleted:3};},
    ADMIN_getBloodRosterForPrint(){return {generated_at:nowText(),audit_id:uid('AUDIT'),school_name:'國立宜蘭高級中學',event:{event_name:'宜中秋季愛心捐血活動',event_date:'2026-11-10',time:'09:00–16:00',location:'學生活動中心前廣場'},summary:{student_count:5,excluded_non_student_count:1,by_slot:[{slot:'09:00',count:2},{slot:'10:00',count:3}]},rows:students.map((s,i)=>({sequence:i+1,participant_name:s.student_name,participant_id:s.student_id,class_name:s.class_name,seat_no:s.seat_no,appointment_time:i<2?'09:00':'10:00',status:'REGISTERED',status_label:'已報名',registered_at:nowText()}))};},
    ADMIN_getEducationAdminData:eduAdmin,
    ADMIN_createEducationCampaign(){return eduAdmin();},ADMIN_updateEducationCampaignLinks(){return eduAdmin();},
    ADMIN_setEducationCampaignActive(id,v){db.education.active=!!v;save();return eduAdmin();},
    ADMIN_setEducationFormOpen(id,type,v){db.education[type==='PRETEST'?'pretest_open':'posttest_open']=!!v;save();return eduAdmin();},
    ADMIN_searchHistoryStudents(filters={}){let rows=students.map(s=>({...s,total_hours:(db.histories[s.email]||[]).reduce((n,r)=>n+Number(r.service_hours||0),0),record_count:(db.histories[s.email]||[]).length}));if(filters.grade)rows=rows.filter(r=>r.class_name.startsWith(filters.grade));if(filters.class_name)rows=rows.filter(r=>r.class_name===filters.class_name);const q=String(filters.query||'').toLowerCase();if(q)rows=rows.filter(r=>JSON.stringify(r).toLowerCase().includes(q));return {rows,total:rows.length,grades:['1','2','3'],classes:['101','202','305','311']};},
    ADMIN_createServiceHistory(p){const unit=adminHome().units.find(x=>x.unit_id===p.unit_id);const unitName=unit?unit.unit_name:p.unit_id;db.histories[p.student_email]=db.histories[p.student_email]||[];db.histories[p.student_email].push({service_date:p.service_date,service_unit:unitName,service_content:p.service_content,service_hours:Number(p.service_hours),status:'志工',certification_unit:p.certification_unit||unitName,notes:p.notes||''});save();return {ok:true};},
    ADMIN_backfillServiceHistory(){return {completed_count:2,added_count:0};},
    ADMIN_getStudentHistoriesForPrint(emails,template){return {generated_at:nowText(),audit_id:uid('AUDIT'),template,school_name:'國立宜蘭高級中學',reports:emails.map(email=>{const s=students.find(x=>x.email===email);const rows=clone(db.histories[email]||[]).map(r=>({...r,record_status:'VERIFIED'}));return {student:{...s,grade:s.class_name.slice(0,1)},rows,summary:{record_count:rows.length,total_hours:rows.reduce((n,r)=>n+Number(r.service_hours||0),0)}};})};},
    MAIL_getCenterData:mailCenter,MAIL_initializeModule:mailCenter,
    MAIL_updateSettings(p){Object.assign(db.mail,p);save();return mailCenter();},
    MAIL_searchRecipients(q=''){q=String(q).toLowerCase();return students.filter(s=>!q||JSON.stringify(s).toLowerCase().includes(q)).map(s=>({email:s.email,name:s.student_name,meta:`${s.class_name}班 ${s.seat_no}號`,type:'STUDENT'}));},
    MAIL_prepareGeneralEmail(email,key){const s=students.find(x=>x.email===email)||students[0];return {recipient:{email:s.email,name:s.student_name},template_key:key,subject:'【宜中校園服務】研習展示通知',body:`${s.student_name}同學您好：\n這是一封 AI 虛擬資料展示信，不會真的寄出。`,test_mode:true,actual_recipient:'demo.admin@gapp.ylsh.ilc.edu.tw'};},
    MAIL_sendGeneralEmail(p){db.mail.logs.unshift({sent_at:nowText(),created_at:nowText(),recipient_name:'展示學生',recipient_email:p.recipient_email,source_module:'MAIL_CENTER',source_entity_id:'DEMO',subject:p.subject,attachment_name:'',error_message:'',test_mode:true,actual_recipient:'demo.admin@gapp.ylsh.ilc.edu.tw',delivery_status:'ACCEPTED',audit_id:uid('AUDIT'),actor_email:'demo.admin@gapp.ylsh.ilc.edu.tw'});save();return {test_mode:true,actual_recipient:'demo.admin@gapp.ylsh.ilc.edu.tw',duplicate_suppressed:false};},
    MAIL_updateTemplate(){return mailCenter();},
    MAIL_prepareBookingEmail(id,key){const b=db.bookings.find(x=>x.booking_id===id)||db.bookings[0];return {recipient:{email:b.student_email,name:b.student_name,meta:`${b.class_name}班 ${b.seat_no}號`},template_key:key,available_templates:mailCenter().templates.filter(t=>t.scope==='BOOKING'),subject:'【宜中】學生服務提醒',body:`${b.student_name}同學您好：請於 ${b.service_date} ${b.start_time} 前往 ${b.unit_name} 報到。`,test_mode:true,actual_recipient:'demo.admin@gapp.ylsh.ilc.edu.tw'};},
    MAIL_sendBookingEmail(p){const b=db.bookings.find(x=>x.booking_id===p.booking_id)||db.bookings[0];return api.MAIL_sendGeneralEmail({recipient_email:b.student_email,subject:p.subject});},
    MAIL_prepareHistoryBatch(emails,layout){const s=students.find(x=>x.email===emails[0])||students[0];return {recipient_count:emails.length,layout_label:({YLSH_BLUE_GOLD:'宜中藍金版',FORMAL_CERTIFICATE:'正式認證版',CLEAN_TABLE:'乾淨純表格版'})[layout]||layout,first_recipient:{name:s.student_name,email:s.email},remaining_quota:94,test_mode:true,actual_recipient:'demo.admin@gapp.ylsh.ilc.edu.tw',preview:{subject:'【宜中】個人志工服務履歷',body:`${s.student_name}同學您好：附件為你的志工服務履歷。`}};},
    MAIL_sendHistoryEmail(){return {test_mode:true,actual_recipient:'demo.admin@gapp.ylsh.ilc.edu.tw'};}
  };
  function runner(success, failure) {
    return new Proxy({}, {get(_, prop) {
      if (prop === 'withSuccessHandler') return fn => runner(fn, failure);
      if (prop === 'withFailureHandler') return fn => runner(success, fn);
      return (...args) => setTimeout(() => { try { if (!api[prop]) throw Error(`DEMO 尚未模擬 ${String(prop)}`); const result=api[prop](...args); if(success)success(clone(result)); } catch(error) { if(failure)failure(error); else console.error(error); } }, 90);
    }});
  }
  window.google = { script: { run: runner() } };
  window.__YLSH_DEMO_API = api;
  window.YLSH_DEMO_RESET = function(){window.name='';localStorage.removeItem(KEY);location.reload();};
})();
