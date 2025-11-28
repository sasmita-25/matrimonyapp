import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UserSideBar from "../components/UserSideBar";
import Footer from "../components/Footer";
import CopyRights from "../components/CopyRights";
import { getUserProfile } from "../api/axiosService/userAuthService";
import profImage from "../assets/images/blue-circle-with-white-user_78370-4707.avif";
import LayoutComponent from "../components/layouts/LayoutComponent";

const UserProfilePage = () => {
  const userId = localStorage.getItem("userId");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserProfile(userId);
      if (response.status === 200) {
        setUserInfo(response.data.data);
      }
    };
    fetchData();
  }, [userId]);

  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      {/* Main Content Area */}
      <div className="pt-16">
        <div className="db">
          <div className="container">
            <div className="row">
              {/* Sidebar - Left Column */}
              <UserSideBar />

              {/* Profile Content - Right Column */}
              <div className="col-md-8 col-lg-9">
                <div className="row">
                  {/* Header with Edit Button */}
                  <div className="col-12">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                      <h2 className="db-tit" style={{ margin: 0 }}>My Profile</h2>
                      <Link
                        to={`/user/user-profile-edit-page/${userId}`}
                        className="btn btn-primary"
                        style={{
                          padding: "10px 24px",
                          fontSize: "14px",
                          borderRadius: "5px",
                          textDecoration: "none",
                        }}
                      >
                        <i className="fa fa-edit" style={{ marginRight: "8px" }}></i>
                        Edit Profile
                      </Link>
                    </div>
                  </div>

                  {/* Profile Header Card */}
                  <div className="col-12 mb-4">
                    <div
                      className="db-profile"
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "25px",
                        padding: "25px",
                        background: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
                      }}
                    >
                      <div
                        className="img overflow-hidden rounded-full flex items-center justify-center bg-gray-200"
                        style={{
                          width: "130px",
                          height: "130px",
                          minWidth: "130px",
                          minHeight: "130px",
                          border: "5px solid #ff6b35"
                        }}
                      >
                        {userInfo?.profileImage ? (
                          <img
                            src={userInfo.profileImage}
                            loading="lazy"
                            alt="Profile"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "center",
                              borderRadius: "50%",
                            }}
                            onError={(e) => {
                              e.target.src = profImage;
                            }}
                          />
                        ) : (
                          <img
                            src={profImage}
                            loading="lazy"
                            alt="Default Profile"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "center",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                      </div>

                      <div className="profile-info" style={{ flex: 1 }}>
                        <div className="user-details">
                          <h3
                            style={{
                              margin: "0 0 15px 0",
                              fontSize: "2rem",
                              fontWeight: "700",
                              color: "#333"
                            }}
                          >
                            {userInfo?.userName || "User Name"}
                          </h3>
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <p
                              style={{
                                margin: "0",
                                color: "#666",
                                fontSize: "1rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                              }}
                            >
                              <i className="fa fa-phone" style={{ color: "#7c3aed", width: "18px" }}></i>
                              <span style={{ fontWeight: "500" }}>{userInfo?.userMobile || "Not provided"}</span>
                            </p>
                            <p
                              style={{
                                margin: "0",
                                color: "#666",
                                fontSize: "1rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                              }}
                            >
                              <i className="fa fa-envelope" style={{ color: "#7c3aed", width: "18px" }}></i>
                              <span style={{ fontWeight: "500" }}>{userInfo?.userEmail || "Not provided"}</span>
                            </p>
                            <div style={{ marginTop: "5px", display: "flex", gap: "10px", alignItems: "center" }}>
                              <span
                                className={`badge ${
                                  userInfo?.profileStatus === "Approved"
                                    ? "bg-success"
                                    : userInfo?.profileStatus === "Pending"
                                    ? "bg-warning text-dark"
                                    : "bg-secondary"
                                }`}
                                style={{
                                  padding: "8px 16px",
                                  fontSize: "0.9rem",
                                  fontWeight: "600",
                                  borderRadius: "20px"
                                }}
                              >
                                {userInfo?.profileStatus || "Pending"}
                              </span>
                              <span
                                className="badge bg-info"
                                style={{
                                  padding: "8px 16px",
                                  fontSize: "0.9rem",
                                  fontWeight: "600",
                                  borderRadius: "20px"
                                }}
                              >
                                {userInfo?.profileVisibility || "Private"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* About Me Section */}
                  {userInfo?.aboutMe && (
                    <div className="col-12 mb-4">
                      <div style={{ 
                        padding: "20px", 
                        background: "#fff", 
                        borderRadius: "10px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
                      }}>
                        <h4 style={{ 
                          marginBottom: "15px", 
                          fontSize: "1.3rem",
                          fontWeight: "600",
                          color: "#333",
                          borderBottom: "2px solid #7c3aed",
                          paddingBottom: "10px"
                        }}>
                          <i className="fa fa-user-circle" style={{ marginRight: "10px", color: "#7c3aed" }}></i>
                          About Me
                        </h4>
                        <p style={{ 
                          color: "#666", 
                          fontSize: "1rem", 
                          lineHeight: "1.6",
                          margin: 0 
                        }}>
                          {userInfo.aboutMe}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Personal Details */}
                  <div className="col-md-6 mb-4">
                    <div style={{ 
                      padding: "20px", 
                      background: "#fff", 
                      borderRadius: "10px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                      height: "100%"
                    }}>
                      <h4 style={{ 
                        marginBottom: "20px", 
                        fontSize: "1.3rem",
                        fontWeight: "600",
                        color: "#333",
                        borderBottom: "2px solid #7c3aed",
                        paddingBottom: "10px"
                      }}>
                        <i className="fa fa-info-circle" style={{ marginRight: "10px", color: "#7c3aed" }}></i>
                        Personal Details
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {userInfo?.gender && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>Gender:</span>
                            <span style={{ color: "#333", fontWeight: "600" }}>{userInfo.gender}</span>
                          </div>
                        )}
                        {userInfo?.dateOfBirth && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>Age:</span>
                            <span style={{ color: "#333", fontWeight: "600" }}>
                              {calculateAge(userInfo.dateOfBirth)} years
                            </span>
                          </div>
                        )}
                        {userInfo?.height && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>Height:</span>
                            <span style={{ color: "#333", fontWeight: "600" }}>{userInfo.height}</span>
                          </div>
                        )}
                        {userInfo?.weight && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>Weight:</span>
                            <span style={{ color: "#333", fontWeight: "600" }}>{userInfo.weight} kg</span>
                          </div>
                        )}
                        {userInfo?.religion && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>Religion:</span>
                            <span style={{ color: "#333", fontWeight: "600" }}>{userInfo.religion}</span>
                          </div>
                        )}
                        {userInfo?.diet && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>Diet:</span>
                            <span style={{ color: "#333", fontWeight: "600" }}>{userInfo.diet}</span>
                          </div>
                        )}
                        {userInfo?.smoking && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>Smoking:</span>
                            <span style={{ color: "#333", fontWeight: "600" }}>{userInfo.smoking}</span>
                          </div>
                        )}
                        {userInfo?.drinking && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>Drinking:</span>
                            <span style={{ color: "#333", fontWeight: "600" }}>{userInfo.drinking}</span>
                          </div>
                        )}
                        {userInfo?.exercise && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>Exercise:</span>
                            <span style={{ color: "#333", fontWeight: "600" }}>{userInfo.exercise}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="col-md-6 mb-4">
                    <div style={{ 
                      padding: "20px", 
                      background: "#fff", 
                      borderRadius: "10px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                      height: "100%"
                    }}>
                      <h4 style={{ 
                        marginBottom: "20px", 
                        fontSize: "1.3rem",
                        fontWeight: "600",
                        color: "#333",
                        borderBottom: "2px solid #7c3aed",
                        paddingBottom: "10px"
                      }}>
                        <i className="fa fa-map-marker" style={{ marginRight: "10px", color: "#7c3aed" }}></i>
                        Location
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {userInfo?.address && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>Address:</span>
                            <span style={{ color: "#333", fontWeight: "600", textAlign: "right" }}>{userInfo.address}</span>
                          </div>
                        )}
                        {userInfo?.city && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>City:</span>
                            <span style={{ color: "#333", fontWeight: "600" }}>{userInfo.city}</span>
                          </div>
                        )}
                        {userInfo?.state && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>State:</span>
                            <span style={{ color: "#333", fontWeight: "600" }}>{userInfo.state}</span>
                          </div>
                        )}
                        {userInfo?.pincode && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>Pincode:</span>
                            <span style={{ color: "#333", fontWeight: "600" }}>{userInfo.pincode}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Family Details */}
                  <div className="col-md-6 mb-4">
                    <div style={{ 
                      padding: "20px", 
                      background: "#fff", 
                      borderRadius: "10px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                      height: "100%"
                    }}>
                      <h4 style={{ 
                        marginBottom: "20px", 
                        fontSize: "1.3rem",
                        fontWeight: "600",
                        color: "#333",
                        borderBottom: "2px solid #7c3aed",
                        paddingBottom: "10px"
                      }}>
                        <i className="fa fa-users" style={{ marginRight: "10px", color: "#7c3aed" }}></i>
                        Family Details
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {userInfo?.fathersName && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>Father's Name:</span>
                            <span style={{ color: "#333", fontWeight: "600" }}>{userInfo.fathersName}</span>
                          </div>
                        )}
                        {userInfo?.mothersName && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>Mother's Name:</span>
                            <span style={{ color: "#333", fontWeight: "600" }}>{userInfo.mothersName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Education Details */}
                  <div className="col-md-6 mb-4">
                    <div style={{ 
                      padding: "20px", 
                      background: "#fff", 
                      borderRadius: "10px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                      height: "100%"
                    }}>
                      <h4 style={{ 
                        marginBottom: "20px", 
                        fontSize: "1.3rem",
                        fontWeight: "600",
                        color: "#333",
                        borderBottom: "2px solid #7c3aed",
                        paddingBottom: "10px"
                      }}>
                        <i className="fa fa-graduation-cap" style={{ marginRight: "10px", color: "#7c3aed" }}></i>
                        Education
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {userInfo?.school && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>School:</span>
                            <span style={{ color: "#333", fontWeight: "600", textAlign: "right" }}>{userInfo.school}</span>
                          </div>
                        )}
                        {userInfo?.college && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>College:</span>
                            <span style={{ color: "#333", fontWeight: "600", textAlign: "right" }}>{userInfo.college}</span>
                          </div>
                        )}
                        {userInfo?.degree && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>Degree:</span>
                            <span style={{ color: "#333", fontWeight: "600" }}>{userInfo.degree.toUpperCase()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Professional Details */}
                  <div className="col-md-6 mb-4">
                    <div style={{ 
                      padding: "20px", 
                      background: "#fff", 
                      borderRadius: "10px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                      height: "100%"
                    }}>
                      <h4 style={{ 
                        marginBottom: "20px", 
                        fontSize: "1.3rem",
                        fontWeight: "600",
                        color: "#333",
                        borderBottom: "2px solid #7c3aed",
                        paddingBottom: "10px"
                      }}>
                        <i className="fa fa-briefcase" style={{ marginRight: "10px", color: "#7c3aed" }}></i>
                        Professional Details
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {userInfo?.jobType && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>Job Type:</span>
                            <span style={{ color: "#333", fontWeight: "600" }}>{userInfo.jobType}</span>
                          </div>
                        )}
                        {userInfo?.companyName && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>Company:</span>
                            <span style={{ color: "#333", fontWeight: "600", textAlign: "right" }}>{userInfo.companyName}</span>
                          </div>
                        )}
                        {userInfo?.jobExperience && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>Experience:</span>
                            <span style={{ color: "#333", fontWeight: "600" }}>{userInfo.jobExperience}</span>
                          </div>
                        )}
                        {userInfo?.salary && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#666", fontWeight: "500" }}>Salary:</span>
                            <span style={{ color: "#333", fontWeight: "600" }}>₹{userInfo.salary}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hobbies & Interests */}
                  {userInfo?.hobbies && userInfo.hobbies.length > 0 && (
                    <div className="col-md-6 mb-4">
                      <div style={{ 
                        padding: "20px", 
                        background: "#fff", 
                        borderRadius: "10px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                        height: "100%"
                      }}>
                        <h4 style={{ 
                          marginBottom: "20px", 
                          fontSize: "1.3rem",
                          fontWeight: "600",
                          color: "#333",
                          borderBottom: "2px solid #7c3aed",
                          paddingBottom: "10px"
                        }}>
                          <i className="fa fa-heart" style={{ marginRight: "10px", color: "#7c3aed" }}></i>
                          Hobbies & Interests
                        </h4>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                          {userInfo.hobbies.map((hobby, index) => (
                            <span
                              key={index}
                              style={{
                                padding: "8px 16px",
                                background: "#f0f0f0",
                                borderRadius: "20px",
                                fontSize: "0.9rem",
                                color: "#555",
                                fontWeight: "500"
                              }}
                            >
                              {hobby}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Partner Preferences */}
                  <div className="col-12 mb-4">
                    <div style={{ 
                      padding: "20px", 
                      background: "#fff", 
                      borderRadius: "10px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
                    }}>
                      <h4 style={{ 
                        marginBottom: "20px", 
                        fontSize: "1.3rem",
                        fontWeight: "600",
                        color: "#333",
                        borderBottom: "2px solid #7c3aed",
                        paddingBottom: "10px"
                      }}>
                        <i className="fa fa-heart-o" style={{ marginRight: "10px", color: "#7c3aed" }}></i>
                        Partner Preferences
                      </h4>
                      <div className="row">
                        <div className="col-md-6">
                          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {(userInfo?.desiredAgeFrom || userInfo?.desiredAgeTo) && (
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "#666", fontWeight: "500" }}>Age Range:</span>
                                <span style={{ color: "#333", fontWeight: "600" }}>
                                  {userInfo.desiredAgeFrom} - {userInfo.desiredAgeTo} years
                                </span>
                              </div>
                            )}
                            {(userInfo?.desiredHeightFrom || userInfo?.desiredHeightTo) && (
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "#666", fontWeight: "500" }}>Height Range:</span>
                                <span style={{ color: "#333", fontWeight: "600" }}>
                                  {userInfo.desiredHeightFrom} - {userInfo.desiredHeightTo} cm
                                </span>
                              </div>
                            )}
                            {userInfo?.desiredLocation && (
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "#666", fontWeight: "500" }}>Location:</span>
                                <span style={{ color: "#333", fontWeight: "600" }}>{userInfo.desiredLocation}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {userInfo?.desiredReligion && (
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "#666", fontWeight: "500" }}>Religion:</span>
                                <span style={{ color: "#333", fontWeight: "600" }}>{userInfo.desiredReligion}</span>
                              </div>
                            )}
                            {userInfo?.desiredCaste && (
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "#666", fontWeight: "500" }}>Caste:</span>
                                <span style={{ color: "#333", fontWeight: "600" }}>{userInfo.desiredCaste}</span>
                              </div>
                            )}
                            {userInfo?.desiredEducation && (
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "#666", fontWeight: "500" }}>Education:</span>
                                <span style={{ color: "#333", fontWeight: "600" }}>{userInfo.desiredEducation}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="col-12 mb-4">
                    <div style={{ 
                      padding: "20px", 
                      background: "#fff", 
                      borderRadius: "10px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
                    }}>
                      <h4 style={{ 
                        marginBottom: "20px", 
                        fontSize: "1.3rem",
                        fontWeight: "600",
                        color: "#333",
                        borderBottom: "2px solid #7c3aed",
                        paddingBottom: "10px"
                      }}>
                        <i className="fa fa-share-alt" style={{ marginRight: "10px", color: "#7c3aed" }}></i>
                        Social Media
                      </h4>
                      <div style={{ 
                        display: "flex", 
                        flexWrap: "wrap", 
                        gap: "15px",
                        justifyContent: "center"
                      }}>
                        {userInfo?.facebook && (
                          <a
                            href={userInfo.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "10px 20px",
                              background: "#1877f2",
                              color: "#fff",
                              borderRadius: "8px",
                              textDecoration: "none",
                              fontWeight: "500",
                              fontSize: "0.95rem"
                            }}
                          >
                            <i className="fa fa-facebook"></i>
                            Facebook
                          </a>
                        )}
                        {userInfo?.instagram && (
                          <a
                            href={userInfo.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "10px 20px",
                              background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                              color: "#fff",
                              borderRadius: "8px",
                              textDecoration: "none",
                              fontWeight: "500",
                              fontSize: "0.95rem"
                            }}
                          >
                            <i className="fa fa-instagram"></i>
                            Instagram
                          </a>
                        )}
                        {userInfo?.linkedin && (
                          <a
                            href={userInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "10px 20px",
                              background: "#0077b5",
                              color: "#fff",
                              borderRadius: "8px",
                              textDecoration: "none",
                              fontWeight: "500",
                              fontSize: "0.95rem"
                            }}
                          >
                            <i className="fa fa-linkedin"></i>
                            LinkedIn
                          </a>
                        )}
                        {userInfo?.whatsapp && (
                          <a
                            href={userInfo.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "10px 20px",
                              background: "#25D366",
                              color: "#fff",
                              borderRadius: "8px",
                              textDecoration: "none",
                              fontWeight: "500",
                              fontSize: "0.95rem"
                            }}
                          >
                            <i className="fa fa-whatsapp"></i>
                            WhatsApp
                          </a>
                        )}
                        {userInfo?.x && (
                          <a
                            href={userInfo.x}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "10px 20px",
                              background: "#000",
                              color: "#fff",
                              borderRadius: "8px",
                              textDecoration: "none",
                              fontWeight: "500",
                              fontSize: "0.95rem"
                            }}
                          >
                            <i className="fa fa-twitter"></i>
                            X (Twitter)
                          </a>
                        )}
                        {userInfo?.youtube && (
                          <a
                            href={userInfo.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "10px 20px",
                              background: "#FF0000",
                              color: "#fff",
                              borderRadius: "8px",
                              textDecoration: "none",
                              fontWeight: "500",
                              fontSize: "0.95rem"
                            }}
                          >
                            <i className="fa fa-youtube-play"></i>
                            YouTube
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
      <CopyRights />
    </div>
  );
};

export default UserProfilePage;