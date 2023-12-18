import Card from "../ui/dashboard/card/card";
import styles from "../ui/dashboard/dashboard.module.css";
import Transactions from "../ui/dashboard/transactions/transactions";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Chart from "../ui/dashboard/chart/chart";
const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
         <Card item={{title:"card1",number:1}}/> 
         <Card item={{title:"card1",number:1}}/> 
         <Card item={{title:"card1",number:1}}/> 
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
