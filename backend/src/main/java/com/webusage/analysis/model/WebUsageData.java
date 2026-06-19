package com.webusage.analysis.model;

public class WebUsageData {
    private String websiteName;
    private String category;
    private long dailyVisitors;
    private String riskLevel;
    private String detailedAnalysis;

    public WebUsageData(String websiteName, String category, long dailyVisitors, String riskLevel, String detailedAnalysis) {
        this.websiteName = websiteName;
        this.category = category;
        this.dailyVisitors = dailyVisitors;
        this.riskLevel = riskLevel;
        this.detailedAnalysis = detailedAnalysis;
    }

    public String getWebsiteName() { return websiteName; }
    public void setWebsiteName(String websiteName) { this.websiteName = websiteName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public long getDailyVisitors() { return dailyVisitors; }
    public void setDailyVisitors(long dailyVisitors) { this.dailyVisitors = dailyVisitors; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public String getDetailedAnalysis() { return detailedAnalysis; }
    public void setDetailedAnalysis(String detailedAnalysis) { this.detailedAnalysis = detailedAnalysis; }
}
