<template>
    <div class="team-introduction">
      <h2 class="section-title">团队简介</h2>
      <p>{{ teamDescription }}</p>
      <div class="center-container">
        <img src="@/assets/img/teamIntroduce.png" class="centered-image">
      </div>
      <h2 class="section-title">团队获奖</h2>
      <p>{{ teamAwards }}</p>
      <div class="center-container">
        <img src="@/assets/img/teamAward.png" class="centered-image">
      </div>
      <hr>
      <h2 class="section-title">了解更多</h2>
      <div class="center-container">
        <img src="@/assets/img/QRcode.png" class="centered-image" id="centered-image">
      </div>
      <p class="centerItem">{{ publics }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'team',
    data() {
      return {
        teamDescription: "小A创新创业团队成立于2015年，由机电工程学院于兆勤教授与创新创业学院许金镇副院长担任团队指导老师，团队成员来自机电工程学院、自动化学院、计算机学院、物理与光电工程学院、管理学院等学院，专攻机械制造、自动化设备、软件开发、计算机视觉、AI等众多技术、项目领域。团队于2019年入驻我校国家级创新创业教育实践基地工大创谷智汇+创客工坊（现更名为创新工坊），成为主要运营团队。",
        publics: "广工大智汇Plus创客工坊公众号",
        teamAwards: "小A创新创业团队已获奖100+次，累计资金达300万元专利软著累计百余项，国内外交流机会超过30次每年在项目上的流动资金至少20w+。我们也将在已有丰硕的基础上继往开来，致力打造“面向实战、全链条培养、创新创业教育融入人才培养全过程”的实践育人新模式。"
      };
    }
  };
  </script>
  
  <style scoped>
  .team-introduction {
    background-color: rgba(239, 239, 239);
    border: 1px solid #ccc;
    border-radius: 18px;
    padding: 20px;
    margin-top: 2%;
    margin-left: 80px;
    width: 30%;
    max-height: 65%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow-y: scroll;
  }

  .section-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
  }
  
  p {
    font-size: 8px;
    line-height: 1.6;
    margin: 0 0 20px 0;
    text-align: left;
  }
  
  .center-container {
    margin: 20px auto;
    max-width: 100%;
  }
  
  .centered-image {
    display: block;
    max-width: 100%;
    height: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  hr {
    margin-bottom: 10px;
  }
  
  #centered-image {
    border-radius: 18px ;
    border: rgba(0,0,0) 1px solid;
  }
  
  .centerItem {
    text-align: center;
  }
  </style>
  