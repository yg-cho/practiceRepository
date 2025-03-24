import React, { useState } from 'react';
import { Pagination, Button, Input, Space, Divider } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';

/**
 * 고급 페이지네이션 컴포넌트
 *
 * @param {Object} props
 * @param {number} props.current - 현재 페이지
 * @param {Function} props.onChange - 페이지 변경 처리 함수 (page, pageSize) => void
 * @param {number} props.total - 총 아이템 수
 * @param {number} props.pageSize - 페이지당 아이템 수 (기본값: 10)
 * @param {string} props.mode - 페이지네이션 모드 ('default', 'text', 'dot')
 * @param {boolean} props.showJumpButtons - 10페이지 이동 버튼 표시 여부
 * @param {number} props.maxDotPages - 점 스타일에서 최대 페이지 수 (기본값: 7)
 */
const AdvancedPagination = ({
  current = 1,
  onChange,
  total,
  pageSize = 10,
  mode = 'default',
  showJumpButtons = false,
  maxDotPages = 7,
  ...props
}) => {
  const [inputValue, setInputValue] = useState('');
  const totalPages = Math.ceil(total / pageSize);

  // 10페이지 이전으로 이동
  const handleJumpPrev = () => {
    const newPage = Math.max(1, current - 10);
    onChange(newPage, pageSize);
  };

  // 10페이지 다음으로 이동
  const handleJumpNext = () => {
    const newPage = Math.min(totalPages, current + 10);
    onChange(newPage, pageSize);
  };

  // 입력한 페이지로 이동
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputPressEnter = () => {
    const page = parseInt(inputValue, 10);
    if (!isNaN(page) && page > 0 && page <= totalPages) {
      onChange(page, pageSize);
    }
    setInputValue('');
  };

  // 점 스타일 페이지네이션
  const DotPagination = () => {
    const totalDotPages = Math.min(totalPages, maxDotPages);

    // 색상 설정
    const colors = {
      normal: '#D9D9D9',
      hover: '#BFBFBF',
      selected: '#1890ff'
    };

    return (
      <Space size="middle">
        {Array.from({ length: totalDotPages }, (_, i) => i + 1).map((page) => (
          <div
            key={page}
            onClick={() => onChange(page, pageSize)}
            onMouseEnter={(e) => {
              if (page !== current) e.currentTarget.style.backgroundColor = colors.hover;
            }}
            onMouseLeave={(e) => {
              if (page !== current) e.currentTarget.style.backgroundColor = colors.normal;
            }}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: page === current ? colors.selected : colors.normal,
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          />
        ))}
      </Space>
    );
  };

  // 페이지네이션 컴포넌트 렌더링
  const renderPagination = () => {
    switch (mode) {
      case 'dot':
        return <DotPagination />;
      case 'text':
        return (
          <div className="pagination-with-input" style={{ display: 'flex', alignItems: 'center' }}>
            <Pagination
              current={current}
              onChange={onChange}
              total={total}
              pageSize={pageSize}
              {...props}
            />
            <div style={{ marginLeft: 16, display: 'flex', alignItems: 'center' }}>
              <Input
                placeholder="페이지 입력"
                value={inputValue}
                onChange={handleInputChange}
                onPressEnter={handleInputPressEnter}
                style={{ width: 80 }}
              />
              <span style={{ marginLeft: 8 }}> / {totalPages} 페이지</span>
            </div>
          </div>
        );
      default:
        return (
          <Pagination
            current={current}
            onChange={onChange}
            total={total}
            pageSize={pageSize}
            {...props}
          />
        );
    }
  };

  // 10페이지 이동 버튼 포함 렌더링
  const renderWithJumpButtons = () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        icon={<DoubleLeftOutlined />}
        onClick={handleJumpPrev}
        disabled={current <= 1}
        style={{ marginRight: 8 }}
      />
      {renderPagination()}
      <Button
        icon={<DoubleRightOutlined />}
        onClick={handleJumpNext}
        disabled={current >= totalPages}
        style={{ marginLeft: 8 }}
      />
    </div>
  );

  return (
    <div className="advanced-pagination">
      {showJumpButtons ? renderWithJumpButtons() : renderPagination()}
    </div>
  );
};

export default AdvancedPagination;