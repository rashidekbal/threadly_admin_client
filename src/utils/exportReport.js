import { getDashboardReport } from "../repository/statsRepo";
import { toast } from "react-toastify";

export const generateAndDownloadReport = () => {
  toast.info("Generating report...");
  getDashboardReport({
    onSuccess: (res) => {
      const reportData = res.data.data;
      const textContent = `THREADLY DASHBOARD REPORT
Generated At: ${new Date(reportData.generatedAt).toLocaleString()}

-- PLATFORM STATS --
Total Users: ${reportData.totalUsers}
Total Posts: ${reportData.totalPosts}
Total Comments: ${reportData.totalComments}
Total Likes: ${reportData.totalLikes}
Total Views: ${reportData.totalViews}

-- SAFETY & MODERATION --
Pending Reports: ${reportData.pendingReports}
Restricted Accounts: ${reportData.restrictedAccounts}

End of Report.`;

      const blob = new Blob([textContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `threadly_report_${new Date().getTime()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Report downloaded");
    },
    onError: () => toast.error("Failed to generate report"),
  });
};
